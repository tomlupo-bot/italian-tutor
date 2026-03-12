# Tooling

Use local app context first. Only use broader research if the user asks for it or if a fact is unstable.

## Preferred Read Paths

Use these first:

- learner snapshot
- mission catalog queries
- curriculum audit query
- local docs and current schema

Prefer reading code and local docs over guessing the runtime shape.

## Common Runtime Actions

### Read learner and curriculum state

Use:

- `learnerState.getSnapshot`
- `missions.listCatalog`
- `contentAudit.getCurriculumSummary`
- `cards.getDue` or `cards.getAll` when relevant

### Update runtime content

Use the existing paths:

- `cards.add`
- `cards.bulkAdd`
- seed mutations
- exercise generation paths

Preserve the current metadata contract when writing content.

### Repair or refresh app data

Typical Convex commands:

- `npx convex dev --once`
- `npx convex run missions:seedCatalog`
- `npx convex run seed:repairRecoveryCards`
- `npx convex run seed:backfillCurriculumMetadata`
- `npx convex run seed:seedExerciseTemplates`

Use only the minimum command needed for the task.

## Verification

For runtime changes, verify with at least one of:

- `npm test`
- `npm run build`
- live browser pass

Use browser testing when:

- mission flow changed
- pattern drill flow changed
- recovery-card flow changed
- navigation or progress surfaces changed

## Browser Guidance

Use Chrome MCP for:

- clicking through mission, pattern, review, and progress surfaces
- checking live counts and visible state
- confirming recovery flows work end to end

Use Playwright only when a scripted repeatable flow is more efficient than live clicking.

## Safety Rules

- Do not overwrite unrelated local changes.
- Do not invent new tables or side storage unless explicitly asked.
- Do not patch around schema problems in chat; fix the real contract if code changes are requested.
