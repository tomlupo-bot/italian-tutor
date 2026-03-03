"use client";

import { useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import MilestoneBar from "@/components/MilestoneBar";
import StreakCalendar from "@/components/StreakCalendar";
import { getNowWarsaw } from "@/lib/date";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

interface Milestone {
  skillId: string;
  name: string;
  level: string;
  category: string;
  rating: number;
  active: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyCard = Record<string, any>;

const LEVEL_ORDER = ["A1", "A2", "B1", "B2"];

const CATEGORY_LABELS: Record<string, string> = {
  cloze: "Fill-in-the-blank",
  word_order: "Word order",
  grammar_pattern: "Grammar patterns",
  translation: "Translation",
  error_recognition: "Error spotting",
};

export default function ProgressPage() {
  const milestones = useQuery(api.milestones.getAll);
  const stats = useQuery(api.sessions.getStats);
  const allCards = useQuery(api.cards.getAll);
  const { year, month, dateStr: today } = getNowWarsaw();

  // Recent sessions for streak calendar
  const thirtyDaysAgo = useMemo(() => {
    const d = new Date(today + "T12:00:00");
    d.setDate(d.getDate() - 30);
    return d.toLocaleDateString("sv-SE");
  }, [today]);
  const recentSessions = useQuery(api.sessions.getByDateRange, {
    from: thirtyDaysAgo,
    to: today,
  });

  // Group milestones by category
  const groupedMilestones = useMemo(() => {
    if (!milestones) return {};
    const groups: Record<string, Milestone[]> = {};
    for (const m of milestones as Milestone[]) {
      if (!m.active) continue;
      if (!groups[m.category]) groups[m.category] = [];
      groups[m.category].push(m);
    }
    for (const cat of Object.keys(groups)) {
      groups[cat].sort((a, b) => {
        const li = LEVEL_ORDER.indexOf(a.level) - LEVEL_ORDER.indexOf(b.level);
        if (li !== 0) return li;
        return a.name.localeCompare(b.name);
      });
    }
    return groups;
  }, [milestones]);

  // CEFR estimate from milestones, or fallback
  const cefrEstimate = useMemo(() => {
    if (!milestones) return null;
    const active = (milestones as Milestone[]).filter((m) => m.active);
    if (active.length === 0) return null;
    const avg = active.reduce((sum, m) => sum + m.rating, 0) / active.length;
    if (avg >= 3.5) return "B2";
    if (avg >= 2.5) return "B1";
    if (avg >= 1.5) return "A2";
    return "A1";
  }, [milestones]);

  // Session dates for streak calendar
  const sessionDates = useMemo(() => {
    if (!recentSessions) return new Set<string>();
    return new Set(recentSessions.map((s) => s.date));
  }, [recentSessions]);

  // Correction cards — recent mistakes to review
  const corrections = useMemo(() => {
    if (!allCards) return { recent: [], byCategory: {} as Record<string, number>, total: 0 };
    const correctionCards = (allCards as AnyCard[]).filter(
      (c) => c.source === "correction",
    );
    // Group by errorCategory
    const byCategory: Record<string, number> = {};
    for (const c of correctionCards) {
      const cat = c.errorCategory || "other";
      byCategory[cat] = (byCategory[cat] ?? 0) + 1;
    }
    // Most recent 8 corrections (by creation time)
    const recent = correctionCards
      .sort((a, b) => (b._creationTime ?? 0) - (a._creationTime ?? 0))
      .slice(0, 8);
    return { recent, byCategory, total: correctionCards.length };
  }, [allCards]);

  // Loading
  if (milestones === undefined || recentSessions === undefined) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="text-accent animate-spin" />
      </main>
    );
  }

  return (
    <main className="max-w-lg mx-auto pb-20 px-4 py-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="p-2 -ml-2 rounded-lg hover:bg-white/5 transition text-white/50 hover:text-white"
        >
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Progress</h1>
          <p className="text-xs text-white/40">
            {cefrEstimate
              ? `Level: ${cefrEstimate}`
              : stats && stats.totalSessions > 0
                ? "Level: A2 (starting)"
                : "Complete lessons to track progress"}
          </p>
        </div>
        {stats && (
          <div className="text-right text-xs text-white/40">
            <p>{stats.streak} day streak</p>
            <p>{stats.totalSessions} sessions</p>
          </div>
        )}
      </div>

      {/* Streak Calendar — compact */}
      <div className="bg-card rounded-2xl border border-white/10 p-3">
        <StreakCalendar
          sessionDates={sessionDates}
          year={year}
          month={month}
        />
      </div>

      {/* Recent Corrections */}
      {corrections.total > 0 && (
        <div className="bg-card rounded-2xl border border-white/10 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-white/60">
              Mistakes to learn from
            </h2>
            <span className="text-[10px] text-white/30">
              {corrections.total} cards
            </span>
          </div>

          {/* Category breakdown */}
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(corrections.byCategory).map(([cat, count]) => (
              <span
                key={cat}
                className="text-[10px] px-2 py-0.5 rounded-full bg-warn/10 text-warn/70"
              >
                {CATEGORY_LABELS[cat] || cat} ({count})
              </span>
            ))}
          </div>

          {/* Recent corrections list */}
          <div className="space-y-1.5">
            {corrections.recent.map((card: AnyCard) => (
              <div
                key={card._id}
                className="flex items-start gap-2 text-xs py-1 border-b border-white/5 last:border-0"
              >
                <span className="flex-1 text-white/80">{card.it}</span>
                <span className="text-white/40 text-right max-w-[40%] truncate">
                  {card.en}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Milestone Progress */}
      {Object.keys(groupedMilestones).length > 0 ? (
        Object.entries(groupedMilestones).map(([category, skills]) => (
          <div
            key={category}
            className="bg-card rounded-2xl border border-white/10 p-4 space-y-3"
          >
            <h2 className="text-sm font-medium text-white/60 capitalize">
              {category}
            </h2>
            <div className="space-y-2">
              {skills.map((skill) => (
                <MilestoneBar
                  key={skill.skillId}
                  name={skill.name}
                  rating={skill.rating}
                  level={skill.level}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="bg-card rounded-2xl border border-white/10 p-4 text-center">
          <p className="text-white/40 text-sm">No skill milestones yet</p>
          <p className="text-xs text-white/30 mt-1">
            Milestones update as Marco analyzes your sessions.
          </p>
        </div>
      )}
    </main>
  );
}
