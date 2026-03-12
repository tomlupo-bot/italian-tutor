# AGENTS.md

## Project Overview

Italian Tutor is a Next.js App Router application for Italian language practice. It uses:

- Next.js 15
- React 19
- Tailwind CSS
- Convex for app data
- OpenAI for chat, TTS, STT, and exercise generation

Primary app code lives in `src/`.
Convex functions and schema live in `convex/`.

## Local Development

Use Node.js 20+.

Install and run:

```bash
npm install
npx convex dev
npm run dev
```

Open `http://localhost:3000/`.

## Required Environment

The app expects `.env.local` in the repo root.

Required values:

```env
OPENAI_API_KEY=...
NEXT_PUBLIC_CONVEX_URL=https://<deployment>.convex.cloud
NEXT_PUBLIC_BASE_PATH=/
```

Useful additional values:

```env
NEXT_PUBLIC_CONVEX_SITE_URL=https://<deployment>.convex.site
OPENAI_TRANSCRIPTION_MODEL=gpt-4o-mini-transcribe
CONVEX_DEPLOYMENT=dev:<deployment>
```

Notes:

- `NEXT_PUBLIC_CONVEX_URL` must be the `.convex.cloud` URL, not `.convex.site`.
- `NEXT_PUBLIC_BASE_PATH` defaults to `/tutor` in `next.config.js`. For fast local development, `/` is still fine, but production-style routing verification should use `/tutor`.
- In development, `/tutor` is simulated with rewrites. In production-style runs, `/tutor` uses a real Next `basePath`. If behavior differs, trust the production-style `/tutor` verification path.
- Production-style deployment contract must be consistent:
  - If the reverse proxy preserves `/tutor`, build with `NEXT_PUBLIC_BASE_PATH=/tutor`.
  - If the reverse proxy strips `/tutor`, build with `NEXT_PUBLIC_BASE_PATH=/`.
  - Do not mix these models.

## Important Structure

- `src/app/` contains routes, layouts, and API handlers.
- `src/app/api/` contains OpenAI-backed server routes.
- `src/app/ConvexClientProvider.tsx` initializes the Convex client.
- `convex/` contains queries, mutations, seed data, and schema.
- `tests/*.test.mjs` contains the current automated tests.

## Commands

- Dev server: `npm run dev`
- Production build: `npm run build`
- Production start: `npm run start`
- Tests: `npm test`
- Prefix smoke check: `npm run smoke:prefix`

If Convex types or generated API bindings look stale, run:

```bash
npx convex dev
```

## Change Guidelines

- Preserve the existing App Router structure.
- Do not hardcode `.convex.site` into the Convex React client.
- Be careful with `NEXT_PUBLIC_BASE_PATH`; route and asset behavior depend on it.
- The app is deployed under `/tutor` in production-style environments. Treat `/tutor` as the authoritative mounted path when verifying routing, manifest, and service worker behavior.
- Do not hardcode `/tutor`; prefer `withBasePath` and `apiPath`, or derive mounted paths from runtime scope when needed.
- Prefer small, targeted changes over broad refactors unless requested.
- Keep API keys and secrets out of committed files.

## Runtime Sources Of Truth

- Use `learnerState.getSnapshot` as the main learner-facing runtime state model.
- Use mission catalog data for mission behavior and progression context.
- Use `contentAudit.getCurriculumSummary` for curriculum coverage and metadata audit work.
- For Marco/app-aware tutoring work, prefer `skills/openclaw/italian-tutor/SKILL.md`.

## Verification Expectations

For changes that affect runtime behavior, verify at least one of:

- `npm test`
- `npm run build`
- `npm run dev`

For changes that affect routing, manifests, service workers, or prefixed deployment behavior, also verify:

- `npm run smoke:prefix`

For Convex-related changes, verify that the app still boots with `.env.local` populated and `npx convex dev` running.

## Verification Ladder

- Logic/data-only changes: `npm test`
- Runtime UI/content changes: `npm test` plus `npm run build`
- Routing, mounted-path, manifest, or service worker changes: `npm run smoke:prefix`
- Critical user-flow changes: Chrome MCP sanity pass or `npm run test:e2e`

## Known Pitfalls

- `next dev` does not fully model production `/tutor` behavior.
- Service worker and manifest issues may only appear under a real mounted prefix.
- If a route works in local dev but fails under `/tutor`, prefer `npm run smoke:prefix` as the deciding check.
