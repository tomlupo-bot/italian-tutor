import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Save a completed session
export const save = mutation({
  args: {
    lessonId: v.optional(v.id("lessons")),
    date: v.string(),
    duration: v.number(),
    type: v.union(
      v.literal("lesson"),
      v.literal("quick_practice"),
      v.literal("free_talk"),
      v.literal("speaking_practice")
    ),
    cardsReviewed: v.number(),
    cardsCorrect: v.number(),
    topic: v.optional(v.string()),
    errors: v.array(
      v.object({
        original: v.string(),
        corrected: v.string(),
        explanation: v.string(),
      })
    ),
    newPhrases: v.array(v.string()),
    phrasesUsed: v.array(v.string()),
    rating: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("sessions", args);
  },
});

// Get recent sessions (for stats)
export const listRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sessions")
      .withIndex("by_date")
      .order("desc")
      .take(args.limit ?? 20);
  },
});

// Get sessions for a date range (for Marco's nightly analysis)
export const getByDateRange = query({
  args: { from: v.string(), to: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sessions")
      .withIndex("by_date", (q) => q.gte("date", args.from).lte("date", args.to))
      .collect();
  },
});

// Get stats summary
export const getStats = query({
  handler: async (ctx) => {
    const allSessions = await ctx.db.query("sessions").collect();
    const allCards = await ctx.db.query("cards").collect();
    const today = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Warsaw" });

    const totalSessions = allSessions.length;
    const totalMinutes = Math.round(
      allSessions.reduce((sum, s) => sum + s.duration, 0) / 60
    );
    const totalCards = allCards.length;
    const masteredCards = allCards.filter(
      (c) => c.interval >= 21 && c.lastQuality && c.lastQuality >= 3
    ).length;

    // Streak calculation — only counts days that have lessons
    // Missing a day with no lesson (e.g. Sunday rest) doesn't break the streak
    const allLessons = await ctx.db.query("lessons").collect();
    const lessonDates = new Set(allLessons.map((l) => l.date));
    const sessionDates = new Set(allSessions.map((s) => s.date));

    let streak = 0;
    const todayDate = new Date(today + "T12:00:00");
    for (let i = 0; i < 60; i++) {
      const checkDate = new Date(todayDate);
      checkDate.setDate(checkDate.getDate() - i);
      const dateStr = checkDate.toLocaleDateString("sv-SE", { timeZone: "Europe/Warsaw" });

      if (sessionDates.has(dateStr)) {
        // Did a session — streak continues
        streak++;
      } else if (lessonDates.has(dateStr) && dateStr < today) {
        // Had a lesson but didn't do it — streak broken
        break;
      }
      // No lesson for this day (weekend/rest) — skip, don't break
    }

    return { totalSessions, totalMinutes, totalCards, masteredCards, streak };
  },
});
