import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Lessons created by Marco (agent) nightly
  lessons: defineTable({
    date: v.string(), // YYYY-MM-DD
    topic: v.string(),
    question: v.string(), // conversation prompt
    grammarFocus: v.optional(v.string()),
    targetPhrases: v.array(
      v.object({
        it: v.string(),
        en: v.string(),
        example: v.optional(v.string()),
      })
    ),
    level: v.string(), // A2, B1, B2
    type: v.union(
      v.literal("daily"),
      v.literal("tutor_prep"),
      v.literal("grammar"),
      v.literal("free"),
      v.literal("weekly_review"),
      v.literal("weekend")
    ),
    // Weekly review data (for weekly_review type)
    weekSummary: v.optional(
      v.object({
        topicsCount: v.number(),
        errorsCount: v.number(),
        newPhrasesCount: v.number(),
        sessionsCount: v.number(),
        totalMinutes: v.number(),
      })
    ),
    // Passive learning resources (for weekend type)
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
  }).index("by_date", ["date"]),

  // SRS flashcards — unified deck
  cards: defineTable({
    it: v.string(),
    en: v.string(),
    example: v.optional(v.string()),
    tag: v.optional(v.string()), // topic tag
    source: v.union(
      v.literal("builtin"),
      v.literal("lesson"),
      v.literal("correction"),
      v.literal("manual")
    ),
    // SRS fields (SM-2)
    ease: v.number(), // default 2.5
    interval: v.number(), // days
    repetitions: v.number(),
    nextReview: v.string(), // YYYY-MM-DD
    lastQuality: v.optional(v.number()), // 1-5
    lastReviewed: v.optional(v.string()),
  })
    .index("by_next_review", ["nextReview"])
    .index("by_tag", ["tag"]),

  // Practice sessions
  sessions: defineTable({
    lessonId: v.optional(v.id("lessons")),
    date: v.string(),
    duration: v.number(), // seconds
    type: v.union(
      v.literal("lesson"),
      v.literal("quick_practice"),
      v.literal("free_talk"),
      v.literal("speaking_practice")
    ),
    // Warmup results
    cardsReviewed: v.number(),
    cardsCorrect: v.number(),
    // Conversation results
    topic: v.optional(v.string()),
    errors: v.array(
      v.object({
        original: v.string(),
        corrected: v.string(),
        explanation: v.string(),
      })
    ),
    newPhrases: v.array(v.string()),
    phrasesUsed: v.array(v.string()), // target phrases successfully used
    rating: v.optional(v.number()), // 1-5 user self-rating
  }).index("by_date", ["date"]),
});
