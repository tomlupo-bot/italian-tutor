import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get cards due for review (today or earlier)
export const getDue = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const today = new Date().toISOString().slice(0, 10);
    const limit = args.limit ?? 12;
    const cards = await ctx.db
      .query("cards")
      .withIndex("by_next_review", (q) => q.lte("nextReview", today))
      .take(limit);
    return cards;
  },
});

// Get all cards (for stats)
export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("cards").collect();
  },
});

// Review a card (SM-2 algorithm)
export const review = mutation({
  args: {
    cardId: v.id("cards"),
    quality: v.number(), // 1 (again), 3 (good), 5 (easy)
  },
  handler: async (ctx, args) => {
    const card = await ctx.db.get(args.cardId);
    if (!card) throw new Error("Card not found");

    const q = args.quality;
    let { ease, interval, repetitions } = card;

    if (q < 3) {
      // Failed — reset
      repetitions = 0;
      interval = 1;
    } else {
      // Passed
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * ease);
      }
      repetitions += 1;
    }

    // Update ease factor
    ease = Math.max(1.3, ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));

    const today = new Date();
    const next = new Date(today);
    next.setDate(next.getDate() + interval);

    await ctx.db.patch(args.cardId, {
      ease,
      interval,
      repetitions,
      nextReview: next.toISOString().slice(0, 10),
      lastQuality: q,
      lastReviewed: today.toISOString().slice(0, 10),
    });
  },
});

// Add a new card (from corrections, lessons, or manual)
export const add = mutation({
  args: {
    it: v.string(),
    en: v.string(),
    example: v.optional(v.string()),
    tag: v.optional(v.string()),
    source: v.union(
      v.literal("builtin"),
      v.literal("lesson"),
      v.literal("correction"),
      v.literal("manual")
    ),
  },
  handler: async (ctx, args) => {
    const today = new Date().toISOString().slice(0, 10);
    return await ctx.db.insert("cards", {
      ...args,
      ease: 2.5,
      interval: 0,
      repetitions: 0,
      nextReview: today,
    });
  },
});

// Bulk add cards (for seeding)
export const bulkAdd = mutation({
  args: {
    cards: v.array(
      v.object({
        it: v.string(),
        en: v.string(),
        example: v.optional(v.string()),
        tag: v.optional(v.string()),
        source: v.union(
          v.literal("builtin"),
          v.literal("lesson"),
          v.literal("correction"),
          v.literal("manual")
        ),
      })
    ),
  },
  handler: async (ctx, args) => {
    const today = new Date().toISOString().slice(0, 10);
    for (const card of args.cards) {
      await ctx.db.insert("cards", {
        ...card,
        ease: 2.5,
        interval: 0,
        repetitions: 0,
        nextReview: today,
      });
    }
  },
});
