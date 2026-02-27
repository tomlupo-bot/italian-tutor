"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Link from "next/link";
import { BookOpen, Zap, Flame, Trophy, AlertTriangle, CalendarDays } from "lucide-react";
import { useMemo } from "react";
import { getNowWarsaw } from "../lib/date";
import units from "../../curriculum/units.json";

export default function Home() {
  const todayLesson = useQuery(api.lessons.getToday);
  const stats = useQuery(api.sessions.getStats);
  const dueCards = useQuery(api.cards.getDue, { limit: 999 });

  const { year: wYear, month: wMonth, dateStr: today } = getNowWarsaw();
  const monthStart = `${wYear}-${String(wMonth + 1).padStart(2, "0")}-01`;
  const monthLessons = useQuery(api.lessons.listRange, { from: monthStart, to: today });
  const monthSessions = useQuery(api.sessions.getByDateRange, { from: monthStart, to: today });

  const missedCount = useMemo(() => {
    if (!monthLessons || !monthSessions) return 0;
    const sessionDates = new Set(monthSessions.map((s) => s.date));
    return monthLessons.filter((l) => l.date < today && !sessionDates.has(l.date)).length;
  }, [monthLessons, monthSessions, today]);

  // Find matching unit for today's lesson
  const currentUnit = useMemo(() => {
    if (!todayLesson) return null;
    return units.find(
      (u) =>
        u.theme.toLowerCase() === todayLesson.topic.toLowerCase() ||
        u.theme_en.toLowerCase() === todayLesson.topic.toLowerCase()
    ) || units[0];
  }, [todayLesson]);

  const hasDueCards = dueCards && dueCards.length > 0;

  return (
    <main className="max-w-lg mx-auto pb-20 px-4 py-4 flex flex-col gap-4">
      {/* Stats Summary */}
      {stats && (
        <div className="flex items-center justify-center gap-6 py-1">
          <div className="flex items-center gap-1.5">
            <Flame size={18} className="text-orange-400" />
            <span className="text-lg font-bold">{stats.streak}</span>
            <span className="text-xs text-white/40">streak</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Trophy size={18} className="text-yellow-400" />
            <span className="text-lg font-bold">{stats.masteredCards}</span>
            <span className="text-xs text-white/40">mastered</span>
          </div>
          <div className="text-xs text-white/30">
            {stats.totalCards} cards · {stats.totalSessions} sessions
          </div>
        </div>
      )}

      {/* Missed lessons banner */}
      {missedCount > 0 && (
        <Link href="/calendar">
          <div className="bg-danger/10 border border-danger/20 rounded-xl px-4 py-3 flex items-center gap-3 hover:bg-danger/15 transition cursor-pointer">
            <AlertTriangle size={18} className="text-danger flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-danger">
                {missedCount} missed lesson{missedCount > 1 ? "s" : ""}
              </p>
              <p className="text-xs text-white/30">Tap to catch up</p>
            </div>
            <CalendarDays size={16} className="text-white/30" />
          </div>
        </Link>
      )}

      {/* Today's Lesson — Unit-focused */}
      {todayLesson && currentUnit ? (
        <Link href={`/lesson/${today}`}>
          <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl border border-accent/30 p-5 space-y-3 hover:border-accent/50 transition cursor-pointer">
            <div className="flex items-center gap-2">
              <BookOpen size={20} className="text-accent-light" />
              <span className="text-sm font-medium text-accent-light">
                Unit {currentUnit.unit}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent-light">
                {currentUnit.level}
              </span>
            </div>
            <h2 className="text-xl font-semibold">{currentUnit.theme}</h2>
            <p className="text-white/50 text-sm">{currentUnit.theme_en}</p>
            <div className="flex items-center gap-3 text-xs text-white/30">
              <span>📝 {currentUnit.grammar_point}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-white/30">
              <span>📍 {currentUnit.scenario.title}</span>
              <span>·</span>
              <span>{currentUnit.vocab.length} words</span>
              <span>·</span>
              <span>{currentUnit.exercises.length} exercises</span>
            </div>
            <div className="pt-2">
              <span className="px-4 py-2 bg-accent rounded-xl text-sm font-medium inline-block">
                Start Lesson →
              </span>
            </div>
          </div>
        </Link>
      ) : todayLesson ? (
        <Link href={`/lesson/${today}`}>
          <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl border border-accent/30 p-5 space-y-2 hover:border-accent/50 transition cursor-pointer">
            <div className="flex items-center gap-2">
              <BookOpen size={20} className="text-accent-light" />
              <span className="text-sm font-medium text-accent-light">Today&apos;s Lesson</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent-light">
                {todayLesson.level}
              </span>
            </div>
            <h2 className="text-xl font-semibold">{todayLesson.topic}</h2>
            <p className="text-white/50 text-sm italic">&ldquo;{todayLesson.question}&rdquo;</p>
            <div className="pt-2">
              <span className="px-4 py-2 bg-accent rounded-xl text-sm font-medium inline-block">
                Start Lesson →
              </span>
            </div>
          </div>
        </Link>
      ) : (
        <div className="bg-card rounded-2xl border border-white/10 p-6 text-center space-y-2">
          <BookOpen size={24} className="text-white/30 mx-auto" />
          <p className="text-white/50">No lesson scheduled for today</p>
          <p className="text-xs text-white/30">
            Head to Practice for flashcards or speaking
          </p>
        </div>
      )}

      {/* Quick Practice */}
      <Link href="/practice">
        <div className="bg-card rounded-2xl border border-white/10 p-5 flex items-center gap-4 hover:border-white/20 transition cursor-pointer">
          <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
            <Zap size={24} className="text-yellow-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">Practice</h3>
            <p className="text-xs text-white/40">
              {hasDueCards
                ? `${dueCards.length} cards due · Flashcards & Speaking`
                : "Flashcards & Speaking practice"}
            </p>
          </div>
          <span className="text-white/30">→</span>
        </div>
      </Link>
    </main>
  );
}
