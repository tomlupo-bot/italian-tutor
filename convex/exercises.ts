import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Warsaw timezone helper
function warsawToday(): string {
  return new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Warsaw" });
}

// Get all exercises for a date (app filters by mode→type mapping client-side)
export const getByDate = query({
  args: { date: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const date = args.date ?? warsawToday();
    return await ctx.db
      .query("exercises")
      .withIndex("by_date", (q) => q.eq("date", date))
      .collect();
  },
});

// Get exercise summary per date in a range (for calendar view)
export const getDateSummaries = query({
  args: { from: v.string(), to: v.string() },
  handler: async (ctx, args) => {
    const exercises = await ctx.db
      .query("exercises")
      .withIndex("by_date", (q) => q.gte("date", args.from).lte("date", args.to))
      .collect();

    // Group by date
    const byDate: Record<string, { total: number; completed: number; types: Set<string> }> = {};
    for (const ex of exercises) {
      if (!byDate[ex.date]) byDate[ex.date] = { total: 0, completed: 0, types: new Set() };
      byDate[ex.date].total++;
      byDate[ex.date].types.add(ex.type);
      if (ex.completed) byDate[ex.date].completed++;
    }

    return Object.entries(byDate).map(([date, info]) => ({
      date,
      total: info.total,
      completed: info.completed,
      types: Array.from(info.types),
    }));
  },
});

// Mark an exercise as completed with result
export const markComplete = mutation({
  args: {
    exerciseId: v.id("exercises"),
    result: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const exercise = await ctx.db.get(args.exerciseId);
    if (!exercise) throw new Error("Exercise not found");
    await ctx.db.patch(args.exerciseId, {
      completed: true,
      result: args.result,
    });
  },
});

// Bulk create exercises (for batch writes from Marco scripts)
// Deduplicates by (date, type, order) — skips if already exists
export const bulkCreate = mutation({
  args: {
    exercises: v.array(
      v.object({
        date: v.string(),
        type: v.string(),
        order: v.number(),
        content: v.any(),
        skillId: v.optional(v.string()),
        difficulty: v.optional(v.string()),
        source: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    let inserted = 0;
    let skipped = 0;

    for (const exercise of args.exercises) {
      // Check for existing exercise with same date + type + order
      const existing = await ctx.db
        .query("exercises")
        .withIndex("by_date_type", (q) =>
          q.eq("date", exercise.date).eq("type", exercise.type)
        )
        .filter((q) => q.eq(q.field("order"), exercise.order))
        .first();

      if (existing) {
        skipped++;
        continue;
      }

      await ctx.db.insert("exercises", {
        ...exercise,
        completed: false,
      });
      inserted++;
    }

    return { inserted, skipped };
  },
});
