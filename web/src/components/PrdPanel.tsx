"use client";

import { useState, useEffect, useRef } from "react";
import { Copy, Check, Download, FileText, Loader2 } from "lucide-react";
import { marked } from "marked";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Props {
  prdContent: string;
  generating: boolean;
  error: string | null;
  featureName: string;
}

marked.setOptions({ gfm: true, breaks: false });

export default function PrdPanel({ prdContent, generating, error, featureName }: Props) {
  const [copied, setCopied] = useState(false);
  const [html, setHtml] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!prdContent) { setHtml(""); return; }
    const result = marked(prdContent);
    if (typeof result === "string") setHtml(result);
    else result.then(setHtml);
  }, [prdContent]);

  // Auto-scroll to bottom while streaming
  useEffect(() => {
    if (generating && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [html, generating]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prdContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([prdContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${featureName || "prd_draft"}.md`.replace(/[^a-z0-9_\-\.]/gi, "_");
    a.click();
    URL.revokeObjectURL(url);
  };

  const isEmpty = !prdContent && !generating && !error;

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-3 flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          Generated PRD
          {generating && <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />}
        </CardTitle>
        {prdContent && (
          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="sm" onClick={handleCopy} className="h-7 px-2 text-xs gap-1">
              {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDownload} className="h-7 px-2 text-xs gap-1">
              <Download className="h-3 w-3" />
              .md
            </Button>
          </div>
        )}
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden pb-4">
        <div ref={scrollRef} className="h-full overflow-y-auto pr-1">
          {isEmpty && (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <FileText className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <p className="text-sm text-muted-foreground">Your PRD will appear here.</p>
              <p className="text-xs text-muted-foreground mt-1">Write a brief and click Generate PRD.</p>
            </div>
          )}

          {error && (
            <div className="rounded-md bg-destructive/10 border border-destructive/30 p-4">
              <p className="text-sm text-destructive font-medium">Generation failed</p>
              <p className="text-xs text-destructive/80 mt-1">{error}</p>
            </div>
          )}

          {generating && !prdContent && (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Drafting your PRD…</p>
              <p className="text-xs text-muted-foreground">This usually takes 30–60 seconds.</p>
            </div>
          )}

          {html && (
            <div
              className="prd-prose"
              dangerouslySetInnerHTML={{ __html: html + (generating ? '<span class="animate-pulse">▋</span>' : "") }}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
