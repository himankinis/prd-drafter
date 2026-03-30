import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { insertPrd } from "@/lib/db";
import type { SseEvent } from "@/lib/types";

// prd-drafter root is one level up from web/
const PROJECT_ROOT = path.resolve(process.cwd(), "..");

const PROMPT = `Read the feature brief in brief.txt and the PRD template in templates/prd_template.md.
Using the brief as your source of truth, write a complete, polished PRD draft that fills in every section of the template.
Replace all placeholder comments with real, specific content based on the brief.
Where the brief doesn't specify details, make reasonable product assumptions and flag them explicitly in parentheses as "(Assumption: ...)".
Output ONLY the finished PRD as markdown. Do not add any commentary, preamble, or explanation before or after the PRD content itself.`;

function deriveFeatureName(brief: string): string {
  const firstLine = brief.split("\n").find((l) => l.trim().length > 0) ?? "Untitled Feature";
  return firstLine.replace(/^Feature:\s*/i, "").trim().slice(0, 80);
}

export async function POST(req: NextRequest) {
  let brief: string;
  let featureName: string;

  try {
    const body = await req.json();
    brief = (body.brief ?? "").trim();
    featureName = (body.featureName ?? "").trim() || deriveFeatureName(brief);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  if (!brief) {
    return NextResponse.json({ ok: false, error: "brief is required" }, { status: 400 });
  }

  // Write brief to file so the template prompt can reference it
  try {
    fs.writeFileSync(path.join(PROJECT_ROOT, "brief.txt"), brief, "utf-8");
  } catch (err) {
    return NextResponse.json({ ok: false, error: `Failed to write brief: ${String(err)}` }, { status: 500 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const send = (event: SseEvent) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
      };

      const proc = spawn("claude", ["--print", "--output-format=text", PROMPT], {
        cwd: PROJECT_ROOT,
        env: { ...process.env },
      });

      let fullText = "";

      proc.stdout.on("data", (chunk: Buffer) => {
        const text = chunk.toString("utf-8");
        fullText += text;
        send({ type: "delta", text });
      });

      proc.stderr.on("data", (chunk: Buffer) => {
        console.error("[claude stderr]", chunk.toString("utf-8").trim());
      });

      proc.on("close", (code) => {
        if (code !== 0) {
          send({ type: "error", message: `claude exited with code ${code}` });
          controller.close();
          return;
        }
        try {
          const record = insertPrd({ feature_name: featureName, brief_content: brief, prd_content: fullText });
          send({ type: "done", id: record.id });
        } catch (err) {
          send({ type: "error", message: `Failed to save: ${String(err)}` });
        }
        controller.close();
      });

      proc.on("error", (err) => {
        send({ type: "error", message: `Failed to start claude: ${err.message}` });
        controller.close();
      });
    },
    cancel() {
      // client disconnected — nothing to kill since we don't have a ref here
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
      Connection: "keep-alive",
    },
  });
}
