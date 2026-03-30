CREATE TABLE IF NOT EXISTS prds (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  feature_name  TEXT    NOT NULL DEFAULT 'Untitled Feature',
  brief_content TEXT    NOT NULL,
  prd_content   TEXT    NOT NULL,
  created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_prds_created_at ON prds (created_at);
