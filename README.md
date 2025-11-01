# MySilentPlan

Expo + React Native application that powers the personal productivity suite for Planner, Faith & Verses, Goals & Streaks, Exercise, Language, Opportunities, Weekly Reflection, and Settings modules.

## Getting Started

1. Ensure Node.js 18+ and npm 9+ are installed.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the Expo development server:
   ```sh
   npm run start
   ```
4. Open the project in Expo Go (or run on a simulator) and wait for the database initialization banner to disappear.

## Data Layer

- SQLite handled through Expo's `expo-sqlite`.
- Schema migrations tracked in `__schema_migrations` with versioned statements declared in `src/db/schema.ts`.
- The first migration (`MIGRATION_1`) provisions planner and faith entry tables alongside a metadata store.

## UI Snapshot

- Minimal home screen at `app/index.tsx` displays the current counts of planner blocks and faith journal entries.
- Design tokens live in `src/theme/colors.ts` to keep primary, accent, and background colors consistent across screens.

## Next Steps

- Flesh out Zustand stores for each module.
- Build Planner and Faith & Verses workflows on top of the initialized schema.
- Backfill README with module-level documentation as features land.

