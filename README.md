# RoamIQ

RoamIQ is a travel intelligence briefing app. Tell it where you're going, when you're traveling, and which passport you hold, and it prepares a destination brief you can reference before you fly.

## Features

- **Destination Search** — Debounced, type-ahead country search backed by a live countries API, with clear "no results" feedback for unmatched queries.
- **Trip Details Form** — Collects departure/return dates and passport country, with live validation (no past departure dates, return date must follow departure, trips capped at 30 days).
- **Dynamic Briefs** — Selecting a country and submitting the form routes to a per-country brief page (`/brief/:id`).
- **Saved Trips** — A dedicated view for revisiting previously generated briefs.

## Tech Stack

- [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for tooling and dev server
- [Vue Router](https://router.vuejs.org/) for client-side routing
- [Pinia](https://pinia.vuejs.org/) for state management
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vitest](https://vitest.dev/) + [@vue/test-utils](https://test-utils.vuejs.org/) for unit testing
- [ESLint](https://eslint.org/) / [oxlint](https://oxc.rs/) / [Prettier](https://prettier.io/) for linting and formatting

## Getting Started

### Prerequisites

- Node.js `^22.18.0` or `>=24.12.0`
- [pnpm](https://pnpm.io/)

### Installation

```sh
pnpm install
```

### Environment Variables

Create a `.env` file at the project root (this file is git-ignored) and provide your own countries API key:

```sh
VITE_REST_COUNTRIES_KEY=your_api_key_here
```

### Development

```sh
pnpm dev
```

### Type-Check, Build, and Minify for Production

```sh
pnpm build
```

### Preview a Production Build

```sh
pnpm preview
```

### Run Unit Tests

```sh
pnpm test:unit
```

### Lint

```sh
pnpm lint
```

## Project Structure

```
src/
├── assets/          # Global styles
├── components/
│   ├── layout/      # App header/footer
│   └── ui/          # Shared UI primitives (inputs, etc.)
├── composables/      # Composition API logic (country search, travel form)
├── router/           # Route definitions
├── stores/           # Pinia stores
├── types/            # Shared TypeScript types
└── views/            # Route-level pages (Home, Brief, Saved)
```

## Roadmap

- **AI-Generated Briefs** — Synthesize destination data (weather windows, entry requirements, local context) into a narrative brief using the OpenAI API.
- **Persisted Saved Trips** — Store generated briefs so the Saved Trips view reflects real trip history instead of a placeholder.

## License

This project currently has no license file; treat it as private/unlicensed until one is added.
