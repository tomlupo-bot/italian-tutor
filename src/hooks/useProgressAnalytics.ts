"use client";

import { useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { getTodayWarsaw } from "@/lib/date";

// ── Types ──────────────────────────────────────────────────────────

interface Milestone {
  _id: string;
  skillId: string;
  name: string;
  level: string;
  category: string;
  rating: number;
  active: boolean;
  lastAssessed?: string;
}

interface Session {
  _id: string;
  date: string;
  duration: number;
  mode?: string;
  rating?: number;
  exercisesCompleted?: number;
  exercisesTotal?: number;
  errors: { original: string; corrected: string; category?: string; skillId?: string }[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyCard = Record<string, any>;

export interface LevelProgress {
  total: number;
  active: number;
  avgRating: number;
  mastered: number;       // rating >= 3
  masteredPct: number;
  struggling: number;     // rating <= 1
  distribution: number[]; // [0, 1, 2, 3, 4] counts
}

export interface SkillInfo {
  id: string;
  name: string;
  level: string;
  category: string;
  rating: number;
}

export interface WeekComparison {
  current: { sessions: number; avgRating: number; exercises: number; errors: number };
  previous: { sessions: number; avgRating: number; exercises: number; errors: number };
  ratingTrend: "up" | "down" | "stable" | "new";
  volumeTrend: "up" | "down" | "stable" | "new";
}

export interface SrsHealth {
  total: number;
  dueToday: number;
  mastered: number;
  learning: number;
  newCards: number;
  lapsed: number;
  retentionRate: number;
  bySource: Record<string, number>;
}

export interface ErrorBreakdown {
  total: number;
  byCategory: Record<string, number>;
}

export interface ProgressAnalytics {
  loading: boolean;
  cefr: string;
  levels: Record<string, LevelProgress>;
  weakest: SkillInfo[];
  strongest: SkillInfo[];
  b2Activation: { mastered: number; total: number; threshold: number; remaining: number; pct: number; unlocked: boolean } | null;
  weekComparison: WeekComparison | null;
  modeBreakdown: Record<string, { sessions: number; avgRating: number; exercises: number }>;
  srs: SrsHealth | null;
  errorBreakdown: ErrorBreakdown | null;
  categoryStrengths: Record<string, { count: number; avgRating: number }>;
  recentLevelUps: SkillInfo[];  // Skills that recently improved
}

// ── Helpers ─────────────────────────────────────────────────────────

function dateNDaysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toLocaleDateString("sv-SE", { timeZone: "Europe/Warsaw" });
}

// ── Hook ────────────────────────────────────────────────────────────

export function useProgressAnalytics(): ProgressAnalytics {
  const today = getTodayWarsaw();
  const thirtyDaysAgo = dateNDaysAgo(30);
  const fourteenDaysAgo = dateNDaysAgo(14);
  const sevenDaysAgo = dateNDaysAgo(7);

  const milestones = useQuery(api.milestones.getAll) as Milestone[] | undefined;
  const sessions = useQuery(api.sessions.getByDateRange, { from: thirtyDaysAgo, to: today }) as Session[] | undefined;
  const allCards = useQuery(api.cards.getAll) as AnyCard[] | undefined;

  const loading = milestones === undefined || sessions === undefined || allCards === undefined;

  // ── Milestone Analysis ──────────────────────────────────────────

  const milestoneAnalysis = useMemo(() => {
    if (!milestones) return null;

    const active = milestones.filter((m) => m.active);
    const byLevel: Record<string, Milestone[]> = {};
    const byCategory: Record<string, Milestone[]> = {};

    for (const m of active) {
      (byLevel[m.level] ??= []).push(m);
      (byCategory[m.category] ??= []).push(m);
    }

    // Level progress
    const levels: Record<string, LevelProgress> = {};
    for (const level of ["A1", "A2", "B1", "B2"]) {
      const skills = byLevel[level];
      if (!skills?.length) continue;
      const ratings = skills.map((s) => s.rating);
      const mastered = ratings.filter((r) => r >= 3).length;
      levels[level] = {
        total: skills.length,
        active: skills.length,
        avgRating: Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 100) / 100,
        mastered,
        masteredPct: Math.round((mastered / ratings.length) * 100),
        struggling: ratings.filter((r) => r <= 1).length,
        distribution: [0, 1, 2, 3, 4].map((v) => ratings.filter((r) => Math.round(r) === v).length),
      };
    }

    // Weakest / strongest
    const weakest = [...active].sort((a, b) => a.rating - b.rating || a.name.localeCompare(b.name)).slice(0, 10);
    const strongest = [...active].sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name)).slice(0, 5);

    // CEFR
    const avg = active.length > 0 ? active.reduce((s, m) => s + m.rating, 0) / active.length : 0;
    const cefr = avg >= 3.5 ? "B2" : avg >= 2.5 ? "B1" : avg >= 1.5 ? "A2" : avg >= 0.5 ? "A1" : "Pre-A1";

    // B2 activation
    const b1 = byLevel["B1"] ?? [];
    const b1Mastered = b1.filter((s) => s.rating >= 3).length;
    const threshold = Math.ceil(b1.length * 0.8);
    const b2Activation = b1.length > 0
      ? { mastered: b1Mastered, total: b1.length, threshold, remaining: Math.max(0, threshold - b1Mastered), pct: threshold > 0 ? Math.round((b1Mastered / threshold) * 100) : 0, unlocked: b1Mastered >= threshold }
      : null;

    // Category strengths
    const categoryStrengths: Record<string, { count: number; avgRating: number }> = {};
    for (const [cat, skills] of Object.entries(byCategory)) {
      const ratings = skills.map((s) => s.rating);
      categoryStrengths[cat] = {
        count: skills.length,
        avgRating: Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 100) / 100,
      };
    }

    // Recently improved (has lastAssessed in last 7 days and rating > 0)
    const recentLevelUps = active
      .filter((m) => m.lastAssessed && m.lastAssessed >= sevenDaysAgo && m.rating > 0)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);

    const toInfo = (m: Milestone): SkillInfo => ({
      id: m.skillId, name: m.name, level: m.level, category: m.category, rating: m.rating,
    });

    return {
      cefr,
      levels,
      weakest: weakest.map(toInfo),
      strongest: strongest.map(toInfo),
      b2Activation,
      categoryStrengths,
      recentLevelUps: recentLevelUps.map(toInfo),
    };
  }, [milestones, sevenDaysAgo]);

  // ── Session Accuracy ────────────────────────────────────────────

  const sessionAnalysis = useMemo(() => {
    if (!sessions) return null;

    // Week comparison
    const recent7 = sessions.filter((s) => s.date >= sevenDaysAgo);
    const prev7 = sessions.filter((s) => s.date >= fourteenDaysAgo && s.date < sevenDaysAgo);

    const periodStats = (list: Session[]) => ({
      sessions: list.length,
      avgRating: list.length > 0 ? Math.round((list.reduce((s, x) => s + (x.rating ?? 0), 0) / list.length) * 10) / 10 : 0,
      exercises: list.reduce((s, x) => s + (x.exercisesCompleted ?? 0), 0),
      errors: list.reduce((s, x) => s + x.errors.length, 0),
    });

    const current = periodStats(recent7);
    const previous = periodStats(prev7);

    const trend = (curr: number, prev: number): "up" | "down" | "stable" | "new" => {
      if (prev === 0) return "new";
      const diff = curr - prev;
      if (Math.abs(diff) < 0.3) return "stable";
      return diff > 0 ? "up" : "down";
    };

    const weekComparison: WeekComparison = {
      current,
      previous,
      ratingTrend: trend(current.avgRating, previous.avgRating),
      volumeTrend: trend(current.sessions, previous.sessions),
    };

    // Mode breakdown
    const modeBreakdown: Record<string, { sessions: number; avgRating: number; exercises: number }> = {};
    for (const s of sessions) {
      const mode = s.mode ?? "unknown";
      if (!modeBreakdown[mode]) modeBreakdown[mode] = { sessions: 0, avgRating: 0, exercises: 0 };
      modeBreakdown[mode].sessions++;
      modeBreakdown[mode].avgRating += s.rating ?? 0;
      modeBreakdown[mode].exercises += s.exercisesCompleted ?? 0;
    }
    for (const mode of Object.values(modeBreakdown)) {
      if (mode.sessions > 0) mode.avgRating = Math.round((mode.avgRating / mode.sessions) * 10) / 10;
    }

    // Error breakdown
    const errorCats: Record<string, number> = {};
    let totalErrors = 0;
    for (const s of sessions) {
      for (const err of s.errors) {
        const cat = err.category ?? "unknown";
        errorCats[cat] = (errorCats[cat] ?? 0) + 1;
        totalErrors++;
      }
    }

    return { weekComparison, modeBreakdown, errorBreakdown: { total: totalErrors, byCategory: errorCats } };
  }, [sessions, sevenDaysAgo, fourteenDaysAgo]);

  // ── SRS Health ──────────────────────────────────────────────────

  const srs = useMemo((): SrsHealth | null => {
    if (!allCards) return null;

    const due = allCards.filter((c) => (c.nextReview ?? "9999") <= today);
    const mastered = allCards.filter((c) => (c.interval ?? 0) >= 21 && (c.lastQuality ?? 0) >= 3);
    const learning = allCards.filter((c) => (c.interval ?? 0) > 0 && (c.interval ?? 0) < 21);
    const newCards = allCards.filter((c) => (c.repetitions ?? 0) === 0);
    const lapsed = allCards.filter((c) => (c.repetitions ?? 0) > 0 && (c.lastQuality ?? 0) < 3 && (c.interval ?? 0) <= 1);
    const reviewed = allCards.filter((c) => (c.repetitions ?? 0) > 0);
    const retained = reviewed.filter((c) => (c.lastQuality ?? 0) >= 3);

    const bySource: Record<string, number> = {};
    for (const c of allCards) bySource[c.source ?? "unknown"] = (bySource[c.source ?? "unknown"] ?? 0) + 1;

    return {
      total: allCards.length,
      dueToday: due.length,
      mastered: mastered.length,
      learning: learning.length,
      newCards: newCards.length,
      lapsed: lapsed.length,
      retentionRate: reviewed.length > 0 ? Math.round((retained.length / reviewed.length) * 100) : 0,
      bySource,
    };
  }, [allCards, today]);

  // ── Return ──────────────────────────────────────────────────────

  return {
    loading,
    cefr: milestoneAnalysis?.cefr ?? "—",
    levels: milestoneAnalysis?.levels ?? {},
    weakest: milestoneAnalysis?.weakest ?? [],
    strongest: milestoneAnalysis?.strongest ?? [],
    b2Activation: milestoneAnalysis?.b2Activation ?? null,
    weekComparison: sessionAnalysis?.weekComparison ?? null,
    modeBreakdown: sessionAnalysis?.modeBreakdown ?? {},
    srs,
    errorBreakdown: sessionAnalysis?.errorBreakdown ?? null,
    categoryStrengths: milestoneAnalysis?.categoryStrengths ?? {},
    recentLevelUps: milestoneAnalysis?.recentLevelUps ?? [],
  };
}
