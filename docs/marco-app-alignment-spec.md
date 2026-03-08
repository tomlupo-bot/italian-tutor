# Marco-App Alignment Spec

## Goal

Align Marco with the current app structure, where the app is built around:

- continuous missions
- multiple sessions per day
- repeatable Bronze/Silver/Gold practice
- mission progress owned by the app
- adaptive follow-up content generated from learner behavior

This document assumes the current app structure is the desired product direction.

## Verdict

The current app and Marco model are not fully aligned.

The app already behaves like a continuous mission-driven tutor. Marco and the surrounding job language still imply an older system:

- weekly mission framing
- Sunday batch generation
- nightly lesson patching
- date-bound lesson availability as the primary delivery model

That older model should be removed.

## Target Architecture

### App Owns

The app is the source of truth for learner-facing progression and runtime state.

It owns:

- active mission selection
- mission catalog
- mission progress
- checkpoint completion
- mission status (`active`, `blocked`, `completed`, `paused`)
- level progression and unlock logic
- session save records
- learner-visible readiness state

### Marco Owns

Marco is an adaptive generation and analysis engine.

It owns:

- generating new exercises
- generating recovery drills
- generating new SRS cards from corrections/errors
- updating inferred skill trends
- updating inferred error trends
- difficulty tuning recommendations
- conversation scenario shaping

Marco does not own learner progression truth.

Marco must not directly decide:

- which mission is active
- whether the user changed mission
- whether a mission is completed
- whether a level is unlocked
- the canonical credit/checkpoint state

## What To Remove From The App

These concepts should be removed because they encode the old weekly/batch model and conflict with the new product shape.

### 1. Weekly mission model

Remove the old weekly mission helper and any usage of it:

- [weeklyMission.ts](/home/botops/openclaw/.openclaw/repos/italian-tutor/src/lib/weeklyMission.ts)

This file encodes:

- week windows
- Monday/Sunday framing
- "By Sunday" objectives
- one weekly scenario rotation

That is obsolete under continuous missions.

### 2. Weekly or nightly user-facing copy

Remove or rewrite app copy that suggests lessons appear from weekly or nightly batch jobs:

- [page.tsx](/home/botops/openclaw/.openclaw/repos/italian-tutor/src/app/page.tsx)
- [page.tsx](/home/botops/openclaw/.openclaw/repos/italian-tutor/src/app/session/[date]/page.tsx)

Bad examples:

- "Exercises will appear after Marco's first nightly run"
- "Exercises are generated Sunday night"
- "nightly patch"
- "Sunday batch"

Replace with language like:

- "Marco adapts new practice from your mission progress and recent mistakes."
- "More practice appears as you train."
- "If a tier is low, Marco prepares more content in the background."

### 3. Date-first lesson dependency in product framing

The app should not conceptually depend on "today has a lesson batch".

The preferred mental model is:

- active mission
- next recommended tier
- available content inventory
- due review cards
- recovery mode if blocked

The `date` field can still exist as a scheduling or query tool, but it should not be the core product abstraction.

### 4. Legacy batch language in backend comments and naming

These comments are not runtime bugs, but they encode the wrong contract and will keep recreating bad design decisions:

- [schema.ts](/home/botops/openclaw/.openclaw/repos/italian-tutor/convex/schema.ts)
- [exercises.ts](/home/botops/openclaw/.openclaw/repos/italian-tutor/convex/exercises.ts)
- [sessions.ts](/home/botops/openclaw/.openclaw/repos/italian-tutor/convex/sessions.ts)

Examples to remove:

- `source: "batch" | "nightly"`
- "for batch writes from Marco scripts"
- "for Marco's nightly analysis"

Replace with:

- `source: "mission_topup" | "recovery" | "ad_hoc" | "seed"`
- "for Marco content ingestion"
- "for Marco analytics"

### 5. Weekly phrasing inside mission catalog content

Clean old weekly wording from the mission/progression content:

- [progressionCatalog.ts](/home/botops/openclaw/.openclaw/repos/italian-tutor/convex/progressionCatalog.ts)

Anything that implies:

- weekly wrap
- weekly objective
- by Sunday
- this week's mission

should become checkpoint- or mission-based wording instead.

## What To Add To The App

### 1. Mission content inventory

The app should work from inventory, not from a single daily lesson batch.

Suggested model:

- each mission has a pool of Bronze content
- each mission has a pool of Silver content
- each mission has a pool of Gold scenarios
- recovery drills are a separate pool

The learner can consume multiple sessions per day without waiting for a new daily lesson.

### 2. Generation readiness state

The app should expose content readiness directly.

Recommended states:

- `ready`
- `low`
- `generating`
- `recovery_only`
- `empty`

This is better than implying a batch job failed to run.

### 3. Mission-aware generation requests

The app should request content in terms of mission need, not day of week.

Examples:

- "Generate 4 Silver drills for mission `a1-bar-caffe-order`"
- "Generate 2 Gold roleplay variants for checkpoint `confirm-order-details`"
- "Generate 8 recovery items for `preposition` and `article_gender_number`"

## Marco: New Role

Marco should move from "lesson planner" to "adaptive mission operator".

### Old Role

- create weekly mission
- create Sunday batch
- create nightly patch
- sync milestone state from separate store

### New Role

- inspect learner state
- detect mission deficits
- detect blocked skills and critical errors
- maintain content pools
- generate recovery content
- enrich SRS from learner mistakes
- provide analytics summaries

Marco should react to learner state changes, not drive the learner through a calendar.

## New Job Model

Replace the old weekly/daily lesson jobs with the following.

### Job 1: Event-Driven Top-Up

Trigger on:

- session completed
- mission changed
- mission checkpoint completed
- tier inventory low
- recovery mode entered

Purpose:

- top up the most relevant content immediately
- keep content available for repeated same-day sessions
- generate mission-aligned next steps

Outputs:

- Silver drills
- Gold scenarios
- recovery drills
- SRS cards from errors

This should be the primary content generation path.

### Job 2: Daily Maintenance

Trigger:

- once per day

Purpose:

- refill low inventory
- deduplicate stale content
- archive or down-rank exhausted variants
- recompute recovery queues
- enrich cards or exercise metadata

This is operational maintenance, not lesson planning.

### Job 3: Periodic Analytics

Trigger:

- daily or several times per day

Purpose:

- aggregate recent session data
- recompute skill trend estimates
- recompute error trend estimates
- surface coaching signals to generation

Outputs:

- skill trend updates
- error trend updates
- recommended mission difficulty adjustments

This job should not create user-facing weekly plans.

## Two-Way Sync Contract

Sync should be bidirectional, but ownership must stay clear.

### App -> Marco

The app sends learner state snapshots or event payloads.

Required payload shape:

```json
{
  "eventType": "session_completed",
  "learnerId": "default",
  "timestamp": "2026-03-08T17:00:00+01:00",
  "activeMission": {
    "missionId": "a1-bar-caffe-order",
    "level": "A1",
    "status": "active",
    "checkpointId": "place-basic-order"
  },
  "missionProgress": {
    "bronze": 6,
    "silver": 2,
    "gold": 1,
    "criticalErrorsCount": 1
  },
  "recentSession": {
    "sessionId": "abc123",
    "mode": "standard",
    "score": 81,
    "errors": ["preposition", "article_gender_number"],
    "phrasesUsed": ["vorrei", "per favore"]
  },
  "inventory": {
    "quickReady": 12,
    "standardReady": 2,
    "deepReady": 0,
    "recoveryReady": 3
  },
  "dueCards": 14
}
```

Marco should treat this as input only. It must not overwrite canonical mission truth.

### Marco -> App

Marco returns generated artifacts and inferred signals.

Required payload shape:

```json
{
  "requestId": "req_123",
  "generatedAt": "2026-03-08T17:00:04+01:00",
  "artifacts": {
    "exercises": [
      {
        "missionId": "a1-bar-caffe-order",
        "checkpointId": "place-basic-order",
        "tier": "standard",
        "type": "pattern_drill",
        "difficulty": "A1",
        "source": "mission_topup"
      }
    ],
    "cards": [
      {
        "it": "al tavolo",
        "en": "at the table",
        "errorCategory": "preposition",
        "source": "correction"
      }
    ]
  },
  "signals": {
    "skills": [
      { "skillKey": "pragmatics", "delta": 1 }
    ],
    "errors": [
      { "errorKey": "preposition", "delta": 2 }
    ]
  },
  "summary": {
    "reason": "deep inventory empty and learner blocked on prepositions",
    "recommendedNextTier": "standard"
  }
}
```

The app should ingest artifacts, but remain the final owner of progression state.

## Data Model Changes Recommended

### Exercise source

Replace vague batch-era source names with generation-purpose names.

Recommended values:

- `mission_topup`
- `recovery`
- `ad_hoc`
- `seed`
- `conversation_variant`

### Exercise metadata

Each generated exercise should be linkable to mission structure.

Recommended additional fields:

- `missionId`
- `checkpointId`
- `tier`
- `generationReason`
- `variantKey`
- `expiresAt` or `staleAfter`

### Inventory queries

Add backend queries for:

- available content by mission and tier
- low inventory detection
- stale content cleanup candidates
- recovery inventory counts

## Migration Plan

### Phase 1: Remove stale weekly framing

- delete [weeklyMission.ts](/home/botops/openclaw/.openclaw/repos/italian-tutor/src/lib/weeklyMission.ts)
- remove weekly/nightly/Sunday copy from UI
- rewrite backend comments/source labels
- clean weekly wording from progression content

### Phase 2: Define the runtime contract

- add explicit inventory/readiness model
- add mission-aware exercise metadata
- add app -> Marco event payload contract
- add Marco -> app artifact payload contract

### Phase 3: Change Marco jobs

- remove weekly batch planner
- replace nightly lesson patch logic with event-driven top-up
- keep one daily maintenance job
- keep one analytics job

### Phase 4: Update app reads

- home reads inventory instead of "today has lesson"
- mission page reads next runnable content per tier
- session page launches from available mission inventory

## Non-Goals

These changes should not require:

- moving mission progression ownership out of Convex
- making Marco the source of truth for mission completion
- forcing one session per day
- reintroducing weekly cycles

## Final Recommendation

If the current app is the product you want, then the alignment decision is straightforward:

- remove weekly mission concepts from the app
- remove batch-era language and assumptions
- keep mission truth in the app
- make Marco an event-driven adaptive content engine
- support two-way sync with strict ownership boundaries

This is the cleanest architecture and matches the current learner experience direction.

## Implementation Status

The repo now includes the first concrete runtime pieces of this contract:

- typed exercise sources:
  - `seed`
  - `mission_topup`
  - `recovery`
  - `ad_hoc`
  - `conversation_variant`
- mission-aware exercise metadata:
  - `missionId`
  - `checkpointId`
  - `tier`
  - `generationReason`
  - `variantKey`
  - `staleAfter`
- inventory readiness query:
  - `api.exercises.getInventoryStatus`

The app has been updated to use inventory readiness on Home, Session, and Mission Hub.

Note: there is no standalone "Marco skill" file in the current Codex skill registry for this repo. This document is the maintained source for Marco/app alignment until a dedicated skill is added.
