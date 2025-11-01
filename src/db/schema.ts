export type Migration = {
  id: number;
  statements: string[];
};

export const MIGRATION_1: Migration = {
  id: 1,
  statements: [
    `CREATE TABLE IF NOT EXISTS planner_blocks (
      id TEXT PRIMARY KEY NOT NULL,
      date TEXT NOT NULL,
      start_minutes INTEGER NOT NULL,
      end_minutes INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      is_fixed INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );`,
    `CREATE INDEX IF NOT EXISTS idx_planner_blocks_date ON planner_blocks (date);`,
    `CREATE UNIQUE INDEX IF NOT EXISTS idx_planner_blocks_date_start ON planner_blocks (date, start_minutes);`,
    `CREATE TABLE IF NOT EXISTS faith_entries (
      id TEXT PRIMARY KEY NOT NULL,
      entry_date TEXT NOT NULL UNIQUE,
      verse TEXT,
      reflection TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );`,
    `CREATE TABLE IF NOT EXISTS metadata (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT NOT NULL
    );`
  ],
};

export const MIGRATIONS: Migration[] = [MIGRATION_1];

export const CURRENT_SCHEMA_VERSION = MIGRATIONS.length;

