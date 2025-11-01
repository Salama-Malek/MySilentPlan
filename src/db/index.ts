import { openDatabaseSync, type SQLiteDatabase } from 'expo-sqlite';

import { MIGRATIONS, type Migration } from './schema';

const DB_NAME = 'mysilentplan.db';
const MIGRATIONS_TABLE = '__schema_migrations';

let databaseInstance: SQLiteDatabase | null = null;

const ensureMigrationsTable = (db: SQLiteDatabase) => {
  db.execSync(
    `CREATE TABLE IF NOT EXISTS ${MIGRATIONS_TABLE} (
      id INTEGER PRIMARY KEY NOT NULL,
      applied_at TEXT NOT NULL
    );`
  );
};

const loadAppliedMigrations = (db: SQLiteDatabase): Set<number> => {
  ensureMigrationsTable(db);
  const rows = db.getAllSync<{ id: number }>(
    `SELECT id FROM ${MIGRATIONS_TABLE} ORDER BY id ASC`
  );
  return new Set(rows.map((row) => row.id));
};

const applyMigration = (db: SQLiteDatabase, migration: Migration) => {
  const appliedAt = new Date().toISOString();

  db.withTransactionSync(() => {
    for (const statement of migration.statements) {
      db.execSync(statement);
    }

    db.runSync(
      `INSERT INTO ${MIGRATIONS_TABLE} (id, applied_at) VALUES (?, ?)`,
      [migration.id, appliedAt]
    );
  });
};

const runMigrations = (db: SQLiteDatabase) => {
  const applied = loadAppliedMigrations(db);

  for (const migration of MIGRATIONS) {
    if (!applied.has(migration.id)) {
      applyMigration(db, migration);
    }
  }
};

export const getDatabase = (): SQLiteDatabase => {
  if (databaseInstance) {
    return databaseInstance;
  }

  const db = openDatabaseSync(DB_NAME);
  db.execSync('PRAGMA foreign_keys = ON;');
  db.execSync('PRAGMA journal_mode = WAL;');

  runMigrations(db);

  databaseInstance = db;
  return db;
};

export const initializeDatabase = () => {
  getDatabase();
};

