import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import os from "os";
import type { PrdRecord, PrdListItem, InsertPrdInput } from "./types";

const DATA_DIR = path.join(os.homedir(), ".prd-drafter");
const DB_PATH = path.join(DATA_DIR, "prd-drafter.db");
const SCHEMA_PATH = path.join(process.cwd(), "src/lib/db/schema.sql");

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (_db) return _db;

  fs.mkdirSync(DATA_DIR, { recursive: true });

  _db = new Database(DB_PATH);
  _db.pragma("journal_mode = WAL");
  _db.pragma("foreign_keys = ON");
  _db.pragma("synchronous = NORMAL");

  const schema = fs.readFileSync(SCHEMA_PATH, "utf-8");
  _db.exec(schema);

  return _db;
}

export function insertPrd(input: InsertPrdInput): PrdRecord {
  const db = getDb();
  return db
    .prepare(
      `INSERT INTO prds (feature_name, brief_content, prd_content)
       VALUES (?, ?, ?)
       RETURNING *`
    )
    .get(input.feature_name, input.brief_content, input.prd_content) as PrdRecord;
}

export function listPrds(): PrdListItem[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT id, feature_name, brief_content, created_at
       FROM prds ORDER BY created_at DESC`
    )
    .all() as PrdListItem[];
}

export function getPrd(id: number): PrdRecord | undefined {
  const db = getDb();
  return db.prepare(`SELECT * FROM prds WHERE id = ?`).get(id) as PrdRecord | undefined;
}

export function deletePrd(id: number): void {
  const db = getDb();
  db.prepare(`DELETE FROM prds WHERE id = ?`).run(id);
}
