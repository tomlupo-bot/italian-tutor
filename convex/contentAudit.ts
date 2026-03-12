import { query } from "./_generated/server";
import { v } from "convex/values";
import { matchesPatternFocusSignals, PATTERN_FOCUS_SIGNALS } from "./sharedExercisePool";

export const exportCorpus = query({
  args: {},
  handler: async (ctx) => {
    const [cards, exercises, exerciseTemplates] = await Promise.all([
      ctx.db.query("cards").collect(),
      ctx.db.query("exercises").collect(),
      ctx.db.query("exerciseTemplates").collect(),
    ]);

    return {
      cards: cards.map((card) => ({
        _id: card._id,
        source: card.source,
        direction: card.direction,
        level: card.level ?? null,
        phase: card.phase ?? null,
        patternId: card.patternId ?? null,
        domain: card.domain ?? null,
        tag: card.tag ?? null,
        it: card.it,
        en: card.en,
        example: card.example ?? null,
        prompt: card.prompt ?? null,
        explanation: card.explanation ?? null,
        errorCategory: card.errorCategory ?? null,
      })),
      exercises: exercises.map((exercise) => ({
        _id: exercise._id,
        date: exercise.date,
        type: exercise.type,
        source: exercise.source ?? null,
        difficulty: exercise.difficulty ?? null,
        phase: exercise.phase ?? null,
        patternId: exercise.patternId ?? null,
        domain: exercise.domain ?? null,
        skillId: exercise.skillId ?? null,
        missionId: exercise.missionId ?? null,
        checkpointId: exercise.checkpointId ?? null,
        completed: exercise.completed,
        content: exercise.content,
      })),
      exerciseTemplates: exerciseTemplates.map((row) => ({
        _id: row._id,
        originMissionId: row.originMissionId ?? null,
        level: row.level,
        type: row.type,
        tier: row.tier,
        skillId: row.skillId ?? null,
        phase: row.phase ?? null,
        patternId: row.patternId ?? null,
        domain: row.domain ?? null,
        title: row.title ?? null,
        variantKey: row.variantKey,
        active: row.active,
        content: row.content,
      })),
    };
  },
});

export const getTemplatesByVariantKeys = query({
  args: {
    variantKeys: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const all = await ctx.db.query("exerciseTemplates").collect();
    return all
      .filter((row) => args.variantKeys.includes(row.variantKey))
      .map((row) => ({
        _id: row._id,
        originMissionId: row.originMissionId ?? null,
        level: row.level,
        type: row.type,
        phase: row.phase ?? null,
        patternId: row.patternId ?? null,
        domain: row.domain ?? null,
        variantKey: row.variantKey,
        content: row.content,
      }));
  },
});

export const getCurriculumSummary = query({
  args: {},
  handler: async (ctx) => {
    const [cards, exerciseTemplates] = await Promise.all([
      ctx.db.query("cards").collect(),
      ctx.db.query("exerciseTemplates").collect(),
    ]);

    const supportedLevels = ["A1", "A2", "B1"];
    const phases = ["phase_1", "phase_2", "phase_3"];

    const topPatterns = Array.from(
      cards.reduce((acc, card) => {
        if (!card.patternId) return acc;
        acc.set(card.patternId, (acc.get(card.patternId) ?? 0) + 1);
        return acc;
      }, new Map<string, number>())
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([patternId, count]) => ({ patternId, count }));

    const topDomains = Array.from(
      cards.reduce((acc, card) => {
        if (!card.domain) return acc;
        acc.set(card.domain, (acc.get(card.domain) ?? 0) + 1);
        return acc;
      }, new Map<string, number>())
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([domain, count]) => ({ domain, count }));

    const byLevel = supportedLevels.map((level) => {
      const levelCards = cards.filter((card) => card.level === level);
      const levelTemplates = exerciseTemplates.filter((row) => row.level === level);
      const phaseCounts = phases.map((phase) => ({
        phase,
        cards: levelCards.filter((card) => card.phase === phase).length,
        templates: levelTemplates.filter((row) => row.phase === phase).length,
      }));

      const lanes = Object.keys(PATTERN_FOCUS_SIGNALS).map((patternKey) => ({
        patternKey,
        cards: levelCards.filter((card) =>
          matchesPatternFocusSignals(
            {
              type: "srs",
              tags: card.tag ? [card.tag] : [],
              errorFocus: card.errorCategory ? [card.errorCategory] : [],
              patternId: card.patternId ?? null,
              domain: card.domain ?? null,
            },
            patternKey,
            { skipTypeCheck: true },
          )
        ).length,
        templates: levelTemplates.filter((row) =>
          matchesPatternFocusSignals(
            {
              type: row.type,
              tags: row.tags,
              errorFocus: row.errorFocus,
              patternId: row.patternId ?? null,
              domain: row.domain ?? null,
            },
            patternKey,
          )
        ).length,
      }));

      return {
        level,
        cards: levelCards.length,
        templates: levelTemplates.length,
        phaseCounts,
        lanes,
      };
    });

    return {
      levels: byLevel,
      topPatterns,
      topDomains,
    };
  },
});
