export interface PrdRecord {
  id: number;
  feature_name: string;
  brief_content: string;
  prd_content: string;
  created_at: string;
}

export interface PrdListItem {
  id: number;
  feature_name: string;
  brief_content: string;
  created_at: string;
}

export interface InsertPrdInput {
  feature_name: string;
  brief_content: string;
  prd_content: string;
}

export type SseEvent =
  | { type: "delta"; text: string }
  | { type: "done"; id: number }
  | { type: "error"; message: string };
