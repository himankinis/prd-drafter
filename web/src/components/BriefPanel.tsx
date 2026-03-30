"use client";

import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Props {
  generating: boolean;
  onGenerate: (brief: string, featureName: string) => void;
}

const PLACEHOLDER = `Feature: In-app notification preferences

Users currently have no way to control which notifications they receive.
They either get everything or nothing.

We want to build a notification preferences screen where users can toggle
individual notification types on/off. Should also support quiet hours.

Target users: all registered users on iOS, Android, and web.
Success = reduce opt-out rate from 40% to under 15% within 60 days.`;

export default function BriefPanel({ generating, onGenerate }: Props) {
  const [brief, setBrief] = useState("");
  const [featureName, setFeatureName] = useState("");

  const handleSubmit = () => {
    if (!brief.trim() || generating) return;
    onGenerate(brief, featureName);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleSubmit();
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Wand2 className="h-4 w-4 text-primary" />
          Feature Brief
        </CardTitle>
        <input
          type="text"
          value={featureName}
          onChange={(e) => setFeatureName(e.target.value)}
          placeholder="Feature name (optional — derived from brief if blank)"
          className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-xs shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </CardHeader>

      <CardContent className="flex flex-col flex-1 gap-3 pb-4">
        <Textarea
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={PLACEHOLDER}
          className="flex-1 resize-none min-h-[300px] text-sm"
          disabled={generating}
        />

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {brief.length > 0 ? `${brief.length} chars` : "Describe the problem, solution, users, and success criteria"}
          </span>
          <Button
            onClick={handleSubmit}
            disabled={!brief.trim() || generating}
            size="sm"
          >
            {generating ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Drafting…
              </>
            ) : (
              <>
                <Wand2 className="h-3.5 w-3.5" />
                Generate PRD
              </>
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-right -mt-2">⌘↵ to generate</p>
      </CardContent>
    </Card>
  );
}
