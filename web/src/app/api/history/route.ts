import { NextResponse } from "next/server";
import { listPrds } from "@/lib/db";

export async function GET() {
  try {
    const prds = listPrds();
    return NextResponse.json({ ok: true, data: prds });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
