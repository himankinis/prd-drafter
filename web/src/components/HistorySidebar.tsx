"use client";

import { useEffect, useState } from "react";
import { Trash2, FileText, Clock } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import type { PrdListItem } from "@/lib/types";

interface Props {
  selectedId: number | null;
  refreshKey: number;
  onSelect: (item: PrdListItem) => void;
}

export default function HistorySidebar({ selectedId, refreshKey, onSelect }: Props) {
  const [items, setItems] = useState<PrdListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/history")
      .then((r) => r.json())
      .then((json) => { if (json.ok) setItems(json.data); })
      .finally(() => setLoading(false));
  }, [refreshKey]);

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    await fetch(`/api/history/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">History</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="px-4 py-6 text-xs text-muted-foreground">Loading…</div>
        ) : items.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <FileText className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">No PRDs yet.</p>
            <p className="text-xs text-muted-foreground mt-1">Generate your first one.</p>
          </div>
        ) : (
          <ul className="py-2">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onSelect(item)}
                  className={[
                    "w-full text-left px-4 py-3 group flex items-start gap-2 hover:bg-accent transition-colors border-b border-border/50 last:border-0",
                    selectedId === item.id ? "bg-accent" : "",
                  ].join(" ")}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{item.feature_name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {format(parseISO(item.created_at), "MMM d, yyyy")}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 h-6 w-6 flex-shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={(e) => handleDelete(e, item.id)}
                    title="Delete"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
