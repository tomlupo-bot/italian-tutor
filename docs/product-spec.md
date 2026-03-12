# Italian Tutor Product Spec

## Status

This is the canonical product reference for Italian Tutor.

Use this document as the primary source of truth for:

- product direction
- learner experience
- curriculum shape
- progression behavior
- content-system priorities
- backend/frontend alignment decisions

Supporting references:

- [fast-italian-roadmap.md](/home/twilc/projects/italian-tutor/italian-tutor/docs/fast-italian-roadmap.md)
- [core-italian-sentence-patterns.md](/home/twilc/projects/italian-tutor/italian-tutor/docs/core-italian-sentence-patterns.md)
- [curriculum-content-model.md](/home/twilc/projects/italian-tutor/italian-tutor/docs/curriculum-content-model.md)
- [content-review-checklist.md](/home/twilc/projects/italian-tutor/italian-tutor/docs/content-review-checklist.md)
- [marco-app-alignment-spec.md](/home/twilc/projects/italian-tutor/italian-tutor/docs/marco-app-alignment-spec.md)
- [marco-runtime-contract.md](/home/twilc/projects/italian-tutor/italian-tutor/docs/marco-runtime-contract.md)
- [user-flows.md](/home/twilc/projects/italian-tutor/italian-tutor/docs/user-flows.md)

If a supporting document conflicts with this spec, follow this spec.

## Product Goal

Italian Tutor helps a learner recover and build practical spoken Italian quickly through:

- chunk-first spaced repetition
- adaptive drill generation
- mission-based scenario practice
- error-driven recovery
- gradual progression from survival communication to functional independence

The default target path is:

- establish reliable A1 production
- build practical A2 daily-life control
- reach functional B1 independence
- support a later B2 reactivation track without redesigning the system

This product is especially well suited to learners who:

- want to speak early
- learn best through retrieval and reuse
- have dormant prior knowledge and want to reactivate it
- want clear next steps instead of an open-ended content library

## Product Principles

### 1. Keep the current app architecture

The existing backend and frontend shape is solid and should remain the foundation:

- Convex owns progression truth
- the app owns active mission, mission progress, and learner-visible readiness
- `learnerState.getSnapshot` is the preferred read model for learner-facing surfaces
- missions remain the core motivational structure
- Bronze, Silver, and Gold remain the main session tiers
- Marco-style generation remains adaptive and artifact-producing, not progression-owning

This spec refines that system. It does not replace it with a new architecture.

### 2. Chunk-first over word-list-first

The system should prefer high-frequency reusable language such as:

- `Ho bisogno di...`
- `Vorrei...`
- `Posso...?`
- `Sono a...`
- `Vado a...`
- `Ho fatto...`
- `Secondo me...`

Single-word cards are acceptable when they clearly support mission use, but the center of gravity should be reusable chunks and sentence frames.

### 3. Retrieval over passive exposure

The product should bias toward:

- recall
- generation
- quick recognition under light pressure
- reuse across multiple contexts

It should avoid becoming mostly:

- browsing
- reading explanations
- memorizing isolated word lists

### 4. Mission pressure reveals real ability

The app should keep using missions because they test whether learning transfers into usable Italian.

Review and drills exist to support mission performance.
Recovery exists to repair what missions expose.

### 5. Errors are curriculum signals

Mistakes should not remain dead-end results.

They should feed:

- recovery drills
- repair cards
- pattern recommendations
- content top-up priorities

### 6. B2 is a target layer, not the starting curriculum center

The product may serve a learner who used to be B2, but the system should still rebuild active control through high-yield A1-A2-B1 language first.

This avoids:

- false confidence from passive familiarity
- patchy speaking ability
- jumping into advanced topics without automatic core language

## Core Learner Model

The current product should be designed around three broad learner states.

### 1. True beginner

Needs:

- survival chunks
- clear pattern repetition
- short sessions
- limited grammar overhead

### 2. Rusty returner

This is an important target learner for the product.

Typical profile:

- old Italian knowledge is partly dormant
- recognition is stronger than production
- grammar familiarity may be higher than fluency
- progress can accelerate quickly if retrieval is structured well

System implications:

- start from A1/A2 production patterns, not from zero-confidence assumptions
- push retrieval early
- allow faster movement across levels when evidence supports it
- avoid wasting time on broad low-yield beginner filler

### 3. Active intermediate learner

Needs:

- more integrated scenario pressure
- more listening and narration
- higher conversational demands
- tighter feedback on quality and nuance

## Product Loop

Italian Tutor is a continuous loop, not a calendar course.

The canonical loop is:

1. review due language
2. train one high-yield pattern lane or focused drill set
3. use language in a mission session
4. detect weak spots and blockers
5. repair those weak spots
6. top up inventory and continue

The product should feel like:

- there is always a best next step
- practice is connected across surfaces
- mistakes lead somewhere useful
- missions provide direction

## Main Product Surfaces

### Home

Home should answer:

- what matters most right now
- whether review is due
- whether recovery is blocking progress
- whether a mission should continue
- which pattern lane is worth training next

Home should stay recommendation-first, not dashboard-for-dashboard's-sake.

### Review

Purpose:

- maintain recall
- strengthen core chunks
- keep mission-supporting language active

Review should focus on:

- high-frequency content
- reusable chunks
- clean bidirectional recall

### Patterns

Purpose:

- train one reusable language family at a time

User-facing pattern lanes should remain broad and practical:

- requests and needs
- movement and location
- past events
- preferences and opinions
- plans and reasons
- conversation repair

These lanes are product UX categories.
They are not replacements for canonical pattern IDs.

### Drills

Purpose:

- provide short focused reps
- support recovery, variation, and extra volume

The drills surface should continue to support:

- mixed practice
- typed drill selection
- adaptive recovery
- pattern-focused generation

### Missions

Purpose:

- test whether trained language works in realistic scenarios
- organize practice into meaningful progression

Mission tiers remain:

- Bronze: recall and setup language
- Silver: guided drills and structured production
- Gold: integrated use, conversation, and applied scenario work

### Recovery

Purpose:

- convert real learner failure into immediate follow-up

Recovery should be:

- short
- direct
- clearly tied to recent weakness
- normalized into reusable language where possible

## Curriculum Spine

The curriculum spine remains fast-path functional Italian.

### Phase 1

Target:

- survival communication

Center of gravity:

- present tense
- `essere`
- `avere`
- modal verbs
- basic prepositions
- high-frequency chunks

Expected outcomes:

- introduce self
- ask for basic things
- order politely
- ask where something is
- ask price and time basics

### Phase 2

Target:

- daily-life control

Center of gravity:

- `passato prossimo`
- reflexives
- direct service/problem-solving interactions
- more robust routine, shopping, housing, travel, and health language

Expected outcomes:

- describe what happened
- manage travel and shopping problems
- ask for clarification
- solve practical daily situations

### Phase 3

Target:

- functional independence

Center of gravity:

- future
- conditional
- connected reasons
- stable preferences and opinions
- broader mission performance

Expected outcomes:

- narrate recent events
- explain plans and reasons
- compare options
- hold longer scenario conversations

### B2 Reactivation Layer

This is a product direction, not a required immediate schema redesign.

The system should eventually support a B2 reactivation layer that builds on the same architecture.

Center of gravity:

- denser listening
- register control
- explanation under constraints
- negotiation
- sustained opinion and tradeoff language
- better discourse cohesion

This layer should be implemented as:

- more advanced missions
- deeper template coverage
- stricter conversation and listening tasks

It should not replace the A1-A2-B1 rebuild spine.

## Canonical Pattern Model

Canonical pattern IDs remain defined in the sentence-pattern reference.

Examples:

- `identity_essere`
- `location_essere`
- `movement_vado`
- `want_voglio`
- `polite_request_vorrei`
- `ability_posso`
- `obligation_devo`
- `need_ho_bisogno_di`
- `like_mi_piace`
- `preference_preferisco`
- `past_ho_participio`
- `plan_penso_di`
- `future_simple`
- `explanation_perche`
- `opinion_secondo_me`

Product rule:

- UX may present broad pattern lanes
- content and generation should increasingly anchor to canonical pattern IDs underneath

This keeps the frontend simple while allowing the backend/content system to become more precise over time.

## Content Model

### Current Runtime Contract

The current schema and app behavior should remain valid.

Current minimum runtime fields already used effectively include:

- `level`
- `tag`
- `direction`
- `source`
- `type`
- `tier`
- `variantKey`
- `skillId`
- `errorFocus`

These are enough to support the current app loop and should not be discarded.

### Target Metadata Direction

To improve audit quality and adaptive precision, the content system should gradually add:

- `phase`
- `patternId`
- `domain`
- `grammarFocus`
- `communicativeFunction`

Recommended rule:

- treat these as progressive enrichments to the current model, not as a breaking redesign

### Extended Authoring Metadata

Some fields are useful for authoring and review even if they are not immediately required in every runtime table:

- `targetForm`
- `substitutionSlots`
- `prerequisitePatterns`
- `prerequisiteGrammar`
- `promptMode`
- `feedbackMode`
- quality indicators such as naturalness and reuse value

These should be introduced where they materially improve generation, QA, or explainability.

## Adaptive System

The adaptive system should keep using the current learner-state model.

### Source of truth

- Convex progression state remains canonical
- `learnerState.getSnapshot` remains the preferred learner-facing read model

### Adaptive outputs

The system should continue to compute and expose:

- active mission
- weak skills
- strong skills
- weak errors
- blockers
- recommended pattern lanes

### Next-step logic

The best-next-step ordering should remain:

1. recovery if critical blockers exist
2. review if due cards are high-value and due
3. mission continuation if progress is unblocked
4. pattern practice when reusable language is the missing bridge

## Mission System

The mission model is one of the strongest parts of the current app and should remain.

### Mission design rules

Every mission should:

- train a coherent practical scenario
- remain close to the taught language spine
- specify tier targets clearly
- identify primary skills and likely error pressure

### Mission progression rules

Mission progress should continue to depend on:

- session quality
- tier credits
- checkpoint performance
- blocker state

Mission access can still be level-driven in the product.
The curriculum model should guide mission content quality, not necessarily hard-gate every transition.

## Recovery System

Recovery is a first-class flow, not a fallback junk drawer.

### Recovery rules

Recovery content should:

- be directly linked to observed learner weakness
- prefer reusable chunks or clean repair patterns
- avoid preserving noisy mistake traces when a normalized repair item is possible
- unblock mission progress quickly

### Recovery outputs

Recovery can generate:

- repair drills
- repair cards
- follow-up conversation prompts

## Learning Method Requirements

The product should consistently use evidence-based learning techniques.

### Must support

- spaced repetition
- retrieval practice
- interleaving
- varied context reuse
- error-driven review
- speaking/listening pressure early

### Must avoid overemphasizing

- passive reading-only study
- isolated low-yield vocabulary
- grammar explanation without retrieval
- abstract advanced content too early

## Recommended Daily Loop

For a normal learner, the recommended loop is:

1. review due cards
2. clear any active recovery blockers
3. run one pattern-focused or adaptive drill set
4. complete one mission session

For a rusty former B2 learner, the same loop applies but progression should move faster when evidence supports it.

## Current Build Priorities

The next product/documentation/content work should optimize for fit with this spec while preserving the current app model.

### Priority 1

Improve seed and template content quality:

- remove low-yield filler
- prefer chunk-first high-frequency content
- normalize awkward or niche entries

### Priority 2

Improve metadata alignment without forcing a schema rewrite:

- tighten `level`, `tag`, and domain consistency
- attach `phase` and `patternId` where practical
- keep pattern lanes backed by real content coverage

### Priority 3

Improve recovery normalization:

- convert artifact-like recovery traces into reusable repair items
- make recovery map more cleanly into current pattern lanes

### Priority 4

Expand listening and B2-reactivation support on top of the same mission/adaptive architecture

## Non-Goals

This product is not trying to be:

- a comprehensive grammar encyclopedia
- a textbook-style linear course
- a weekly lesson batch system
- a browse-first content library
- a CEFR-complete syllabus before speaking begins

## Build Rule

When making product, curriculum, content, or UX decisions:

1. preserve the current mission/adaptive/snapshot architecture
2. prefer chunk-first reusable language
3. favor retrieval and transfer over passive explanation
4. use the roadmap and pattern docs as supporting references
5. choose the smallest change that moves the product closer to this spec
