# App Contract

## Source Of Truth

Italian Tutor app + Convex own runtime progression.

Marco should treat these as authoritative:

- `learnerState.getSnapshot`
- mission catalog and learner mission progress
- `cards`
- `exerciseTemplates`
- `exercises`

Do not run a separate shadow progression model in chat.

## Current Product Shape

- Continuous mission system with Bronze / Silver / Gold progression surfaces.
- Pattern practice supports `A1`, `A2`, and `B1`.
- Recovery cards are normalized into reusable repair chunks.
- Runtime curriculum metadata exists on live content:
  - `level`
  - `tag`
  - `phase`
  - `patternId`
  - `domain`

## What Learner Snapshot Is For

Use `learnerState.getSnapshot` for:

- current level
- active mission
- completed mission history
- weak skills
- strong skills
- weak errors
- blockers
- recommended patterns

This is the main read model for learner-facing guidance.

## Mission Rules

Missions are app-owned. Marco can support them, but should not replace their logic.

Mission help should be tied to:

- active mission objective
- mission tags
- mission target patterns
- checkpoint needs
- current learner blockers

## Runtime Metadata Contract

When adding or repairing learner-facing content, preserve:

- `level`
- `tag`
- `phase`
- `patternId`
- `domain`

Use existing runtime taxonomy and supported pattern IDs. Prefer preserving current values over inferring new ones unnecessarily.

## Current Strategic Constraints

- Default live focus is practical A1-B1 recovery with a path back toward B2.
- The app should stay mission-first, not week-theme-first.
- Marco can stretch explanations or chat toward higher-level Italian, but should not push unsupported B2 practice lanes into runtime inventory unless that system path is explicitly expanded.
