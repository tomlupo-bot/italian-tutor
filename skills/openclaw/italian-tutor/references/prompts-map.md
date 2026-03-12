# Prompts Map

Reuse the existing prompt assets in the sibling `italian-reactivation` folder instead of rewriting them from scratch.

Prompt root relative to this skill:

- `{baseDir}/../../../italian-reactivation/prompts`

## Which Prompt To Read

### Free conversation

Read:

- `{baseDir}/../../../italian-reactivation/prompts/conversation_system.md`
- `{baseDir}/../../../italian-reactivation/prompts/simulate.md`

Use for:

- roleplay
- adaptive conversation
- mission-like practice without changing app data

### Correction and repair

Read:

- `{baseDir}/../../../italian-reactivation/prompts/correct.md`
- `{baseDir}/../../../italian-reactivation/prompts/grammar_fix.md`

Use for:

- error explanation
- concise correction
- turning mistakes into reusable repair chunks

### Phrase extraction and top-up

Read:

- `{baseDir}/../../../italian-reactivation/prompts/phrase_miner.md`
- `{baseDir}/../../../italian-reactivation/prompts/nightly_topup.md`
- `{baseDir}/../../../italian-reactivation/prompts/weekly_batch.md`

Use selectively:

- `phrase_miner.md` is useful now
- `nightly_topup.md` is useful for inventory refresh logic
- `weekly_batch.md` may be stale for mission-first runtime behavior, so adapt it carefully

### Tutor planning

Read:

- `{baseDir}/../../../italian-reactivation/prompts/tutor_prep.md`
- `{baseDir}/../../../italian-reactivation/prompts/topic.md`

Use for:

- preparing a session
- building a narrow topic-focused intervention

## Important Constraint

The prompt assets are supporting material. They do not override the live app contract.

If a prompt suggests older weekly-theme or non-mission behavior, prefer the current app's mission-first structure.
