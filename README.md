# MySilentPlan

A personal productivity app for daily planning, faith reflection, and habit tracking, built with Expo and React Native.

## Overview

MySilentPlan is a cross-platform (iOS, Android, web) mobile app scaffolded with Expo Router. It is designed around a set of personal productivity modules — Planner, Faith & Verses, Goals & Streaks, Exercise, Language, Opportunities, and Weekly Reflection — backed by a local SQLite database with a versioned migration system. The current build includes the app shell, routing, database layer, and a home screen that reads live counts from the database.

## Features

- File-based routing via Expo Router (`app/` directory) with a shared root layout and status bar styling.
- Local-first data storage using `expo-sqlite`, with a migration runner that tracks applied schema versions in a `__schema_migrations` table.
- Initial schema covering planner blocks (time-boxed entries with fixed/flexible flags) and faith journal entries (verse + reflection per date).
- Home screen that queries the database on load and displays live counts of planner blocks and faith entries, with loading and error states.
- Centralized design tokens (`src/theme/colors.ts`) for consistent primary, accent, and background colors.
- Dependencies in place for internationalization (`i18next`), state management (`zustand`), charts (`react-native-chart-kit`), notifications (`expo-notifications`), and gesture/animation support (`react-native-gesture-handler`, `react-native-reanimated`).

## Tech Stack

- [Expo](https://expo.dev) 54 / [React Native](https://reactnative.dev) 0.81
- [Expo Router](https://docs.expo.dev/router/introduction/) for navigation
- [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/) for local persistence
- [Zustand](https://github.com/pmndrs/zustand) for state management
- [react-i18next](https://react.i18next.com/) for internationalization
- TypeScript, ESLint, Prettier

## Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Expo Go app (for device testing) or an iOS/Android simulator

### Install

```sh
npm install
```

### Run

```sh
npm run start     # Expo dev server (scan QR with Expo Go)
npm run ios        # Run on iOS simulator
npm run android     # Run on Android simulator
npm run web         # Run in a web browser
```

### Lint

```sh
npm run lint
```

### Environment variables

None required for the current codebase.

## Project Structure

```
app/
  _layout.tsx     # Root layout: Stack navigator, status bar
  index.tsx       # Home screen: displays live planner/faith counts
src/
  db/
    index.ts      # Database connection + migration runner
    schema.ts     # Versioned SQL migrations
  theme/
    colors.ts     # Shared color tokens
```

## Roadmap

- Build out Zustand stores for each product module.
- Implement Planner and Faith & Verses workflows on top of the initialized schema.
- Add Goals & Streaks, Exercise, Language, Opportunities, and Weekly Reflection modules.

## License

MIT. See [LICENSE](LICENSE).
