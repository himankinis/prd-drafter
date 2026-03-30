"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import BriefPanel from "@/components/BriefPanel";
import PrdPanel from "@/components/PrdPanel";
import HistorySidebar from "@/components/HistorySidebar";
import type { SseEvent, PrdListItem } from "@/lib/types";

export default function Home() {
  const [prdContent, setPrdContent] = useState("");
  const [featureName, setFeatureName] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [historyKey, setHistoryKey] = useState(0);

  const handleGenerate = async (brief: string, name: string) => {
    setPrdContent("");
    setError(null);
    setGenerating(true);
    setFeatureName(name);
    setSelectedId(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief, featureName: name }),
      });

      if (!res.ok || !res.body) {
        throw new Error(`HTTP ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";

        for (const part of parts) {
          const line = part.replace(/^data: /, "").trim();
          if (!line) continue;
          try {
            const event = JSON.parse(line) as SseEvent;
            if (event.type === "delta") {
              setPrdContent((prev) => prev + event.text);
            } else if (event.type === "done") {
              setSelectedId(event.id);
              setHistoryKey((k) => k + 1);
              setGenerating(false);
            } else if (event.type === "error") {
              setError(event.message);
              setGenerating(false);
            }
          } catch {
            // skip malformed event
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setGenerating(false);
    }
  };

  const handleSelectHistory = async (item: PrdListItem) => {
    setSelectedId(item.id);
    setFeatureName(item.feature_name);
    setError(null);
    setGenerating(false);

    const res = await fetch(`/api/history/${item.id}`);
    const json = await res.json();
    if (json.ok) setPrdContent(json.data.prd_content);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center gap-3 px-6 py-3 border-b border-border bg-card shadow-sm flex-shrink-0">
        <FileText className="h-5 w-5 text-primary" />
        <h1 className="text-sm font-semibold">PRD Drafter</h1>
        <span className="text-xs text-muted-foreground">AI-assisted PRD generation</span>
      </header>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* History sidebar */}
        <aside className="w-56 flex-shrink-0 border-r border-border bg-card overflow-hidden">
          <HistorySidebar
            selectedId={selectedId}
            refreshKey={historyKey}
            onSelect={handleSelectHistory}
          />
        </aside>

        {/* Brief + PRD panels */}
        <main className="flex-1 grid grid-cols-2 gap-4 p-4 overflow-hidden">
          <BriefPanel generating={generating} onGenerate={handleGenerate} />
          <PrdPanel
            prdContent={prdContent}
            generating={generating}
            error={error}
            featureName={featureName}
          />
        </main>
      </div>
    </div>
  );
}
