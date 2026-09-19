# Sanatan Dharma

A bilingual daily companion for understanding and practising Sanatan Dharma.

## Run locally

Requires Node.js 20.9 or newer and npm. Install the locked dependencies with `npm ci`, copy `.env.example` to `.env.local` if setting up a new environment, and run `npm run dev`. Never commit `.env.local` or secrets.

Open http://localhost:3000/en or http://localhost:3000/hi.

Public Today, Panchang preview, Learn, Festivals, Search, Ask reading discovery and browser-local saved reading work without a database. Supabase configuration and published content are required for authentication and the scripture reader. Preserve the existing project's database; do not run migrations against production just to demonstrate the site.

## Checks

```sh
npm test
npm run lint
npm run typecheck
npm run build
# With the local server running:
npm run test:smoke
```

## V1 boundaries

Panchang values are explicitly illustrative and have no applicable date. No live calculation service is connected. Ask is a deterministic reading finder, not a generative AI service. Draft editorial content remains labelled; some older article sections have labelled English fallback. Saved Learn articles live in this browser and do not sync to an account.

## Documentation

- [Current product strategy and demonstration journey](docs/markdown/Product%20Discovery%20%26%20V1%20Strategy.md)
- [QA and remaining launch work](docs/markdown/QA%20%26%20Release%20Checklist%20%E2%80%94%20Sanatan%20Dharma%20Platform.md)
- Existing architecture, content standards and RAG specifications remain under `docs/markdown` with current-scope notes.
