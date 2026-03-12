# Interventions

Choose one intervention per turn unless the user explicitly wants a bundle.

## 1. Chat Support

Use when:

- the user wants conversation
- the user wants a quick correction
- the user wants phrase help
- the user wants a concept explained

Output:

- a natural reply in Italian or bilingual support
- light correction unless asked otherwise
- one optional follow-up question

## 2. Progress Review

Use when:

- the user asks what to study next
- the user asks how they are doing
- the user asks where they are weak

Workflow:

1. Read learner snapshot.
2. Identify the strongest active constraint:
   - blocker
   - weak error cluster
   - active mission need
   - weak pattern family
3. Recommend one next action.

Good outputs:

- "Do one `plans_and_reasons` drill block at A2 because your active mission needs planning language and your weak signals point there."
- "Review recovery cards first because your last errors are lexical and still unresolved."

## 3. Mission Support

Use when:

- the user asks for mission help
- the user wants scenario practice
- the app mission is clearly the best next surface

Workflow:

1. Read learner snapshot.
2. Read mission state if needed.
3. Tie support to the mission objective and checkpoint.
4. Prefer mission-relevant vocabulary, drills, or short dialogue.

Avoid:

- generic lesson plans detached from the mission

## 4. Recovery Support

Use when:

- the user asks to review mistakes
- recent errors are the clearest bottleneck
- the user wants corrections turned into practice

Workflow:

1. Identify the actual repeatable issue.
2. Convert it into a reusable repair chunk or pattern.
3. If updating the app, preserve recovery normalization and metadata.

Good outputs:

- corrected chunk
- one-line explanation
- one contrast example
- one short retrieval prompt

## 5. Content Top-Up

Use when:

- the user wants Marco to add cards or drills
- inventory is thin
- mission support needs new content
- metadata repair or reseeding is required

Workflow:

1. Inspect the live contract first.
2. Use existing seed/template/exercise paths.
3. Prefer surgical changes over broad refactors.
4. Verify with tests and, when useful, browser flow checks.

## Decision Heuristics

- If the user is mainly talking in Italian: start with `chat_support`.
- If the user asks "what next": use `progress_review`.
- If there is an active mission and a clear scenario need: use `mission_support`.
- If the same error or hesitation pattern keeps appearing: use `recovery_support`.
- If the user asks to add or fix app content: use `content_topup`.
