import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get today's lesson
export const getToday = query({
  handler: async (ctx) => {
    const today = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Warsaw" });
    const lessons = await ctx.db
      .query("lessons")
      .withIndex("by_date", (q) => q.eq("date", today))
      .take(1);
    return lessons[0] ?? null;
  },
});

// Get lesson by date
export const getByDate = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    const lessons = await ctx.db
      .query("lessons")
      .withIndex("by_date", (q) => q.eq("date", args.date))
      .take(1);
    return lessons[0] ?? null;
  },
});

// List recent lessons
export const listRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("lessons")
      .withIndex("by_date")
      .order("desc")
      .take(args.limit ?? 10);
  },
});

// Get lessons for a date range (for calendar view)
export const listRange = query({
  args: { from: v.string(), to: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("lessons")
      .withIndex("by_date", (q) => q.gte("date", args.from).lte("date", args.to))
      .collect();
  },
});

// Create a lesson (called by Marco agent via HTTP)
export const create = mutation({
  args: {
    date: v.string(),
    topic: v.string(),
    question: v.string(),
    grammarFocus: v.optional(v.string()),
    targetPhrases: v.array(
      v.object({
        it: v.string(),
        en: v.string(),
        example: v.optional(v.string()),
      })
    ),
    level: v.string(),
    type: v.union(
      v.literal("daily"),
      v.literal("tutor_prep"),
      v.literal("grammar"),
      v.literal("free"),
      v.literal("weekly_review"),
      v.literal("weekend")
    ),
    weekSummary: v.optional(
      v.object({
        topicsCount: v.number(),
        errorsCount: v.number(),
        newPhrasesCount: v.number(),
        sessionsCount: v.number(),
        totalMinutes: v.number(),
      })
    ),
    resources: v.optional(
      v.array(
        v.object({
          type: v.union(
            v.literal("podcast"),
            v.literal("video"),
            v.literal("article")
          ),
          title: v.string(),
          url: v.string(),
          description: v.optional(v.string()),
          level: v.optional(v.string()),
        })
      )
    ),
  },
  handler: async (ctx, args) => {
    // Upsert: delete existing lesson for same date
    const existing = await ctx.db
      .query("lessons")
      .withIndex("by_date", (q) => q.eq("date", args.date))
      .take(1);
    if (existing[0]) {
      await ctx.db.delete(existing[0]._id);
    }
    return await ctx.db.insert("lessons", args);
  },
});
