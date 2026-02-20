"use client";

import { useState, useEffect } from "react";
import { vocab } from "../../data/vocab";
import { loadSRS, getDueCards } from "../../lib/srs";
import { loadUserVocab, loadSessions, getStreak, loadDailyActivity, type SessionRecord } from "../../lib/storage";
import { cn } from "../../lib/cn";

export default function StatsPage() {
  const [mounted, setMounted] = useState(false);
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [streak, setStreak] = useState(0);
  const [totalCards, setTotalCards] = useState(0);
  const [dueToday, setDueToday] = useState(0);
  const [mastered, setMastered] = useState(0);
  const [levelStats, setLevelStats] = useState<Record<string, { total: number; mastered: number }>>({});
  const [statusStats, setStatusStats] = useState({ new: 0, learning: 0, review: 0, mastered: 0 });
  const [tagStats, setTagStats] = useState<{ tag: string; count: number }[]>([]);
  const [weekHeatmap, setWeekHeatmap] = useState<{ date: string; day: string; active: boolean; count: number }[]>([]);
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    const allVocab = [...vocab, ...loadUserVocab()];
    const srs = loadSRS();
    const allIds = allVocab.map((v) => v.id);
    const due = getDueCards(srs, allIds);

    // Level stats
    const levels: Record<string, { total: number; mastered: number }> = {};
    for (const card of allVocab) {
      const lvl = card.level || "?";
      if (!levels[lvl]) levels[lvl] = { total: 0, mastered: 0 };
      levels[lvl].total++;
      const srsCard = srs[card.id];
      if (srsCard && srsCard.interval >= 30) levels[lvl].mastered++;
    }

    // Status stats
    let newCount = 0, learning = 0, reviewCount = 0, masteredCount = 0;
    for (const id of allIds) {
      const card = srs[id];
      if (!card) { newCount++; continue; }
      if (card.interval >= 30) masteredCount++;
      else if (card.interval >= 7) reviewCount++;
      else learning++;
    }

    // Tag coverage from SRS data
    const tagCounts: Record<string, number> = {};
    for (const id of allIds) {
      if (srs[id]) {
        const card = allVocab.find((v) => v.id === id);
        if (card?.tag) tagCounts[card.tag] = (tagCounts[card.tag] || 0) + 1;
      }
    }
    const sortedTags = Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);

    // Weekly heatmap
    const activity = loadDailyActivity();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const heatmap = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const dateStr = d.toISOString().split("T")[0];
      heatmap.push({
        date: dateStr,
        day: days[d.getDay()],
        active: !!activity[dateStr],
        count: activity[dateStr]?.cardsReviewed || 0,
      });
    }

    // Accuracy
    let goodOrEasy = 0, total = 0;
    for (const dateKey of Object.keys(activity)) {
      const qs = activity[dateKey].qualities || [];
      for (const q of qs) {
        total++;
        if (q >= 3) goodOrEasy++;
      }
    }

    setTotalCards(allVocab.length);
    setDueToday(due.length);
    setMastered(masteredCount);
    setLevelStats(levels);
    setStatusStats({ new: newCount, learning, review: reviewCount, mastered: masteredCount });
    setTagStats(sortedTags);
    setWeekHeatmap(heatmap);
    setAccuracy(total > 0 ? Math.round((goodOrEasy / total) * 100) : 0);
    setSessions(loadSessions());
    setStreak(getStreak());
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen flex items-center justify-center max-w-lg mx-auto pb-20">
        <p className="text-white/40">Loading...</p>
      </main>
    );
  }

  const last7 = sessions.slice(-7).reverse();

  return (
    <main className="min-h-screen max-w-lg mx-auto pb-20 px-4 py-6 space-y-6">
      <h1 className="text-xl font-semibold text-accent-light text-center">📊 Statistics</h1>

      {/* Overview */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card rounded-xl border border-white/10 p-4 text-center">
          <p className="text-2xl font-bold text-accent-light">{sessions.length}</p>
          <p className="text-xs text-white/40">Total Sessions</p>
        </div>
        <div className="bg-card rounded-xl border border-white/10 p-4 text-center">
          <p className="text-2xl font-bold text-success">{streak}</p>
          <p className="text-xs text-white/40">Day Streak 🔥</p>
        </div>
        <div className="bg-card rounded-xl border border-white/10 p-4 text-center">
          <p className="text-2xl font-bold">{totalCards}</p>
          <p className="text-xs text-white/40">Total Cards</p>
        </div>
        <div className="bg-card rounded-xl border border-white/10 p-4 text-center">
          <p className="text-2xl font-bold text-warn">{dueToday}</p>
          <p className="text-xs text-white/40">Due Today</p>
        </div>
      </div>

      {/* Weekly Heatmap */}
      <div className="bg-card rounded-xl border border-white/10 p-4 space-y-2">
        <h2 className="text-sm font-medium text-white/60">This Week</h2>
        <div className="flex gap-2 justify-center">
          {weekHeatmap.map((d) => (
            <div key={d.date} className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium",
                  d.active ? "bg-success/30 text-success" : "bg-white/5 text-white/20"
                )}
              >
                {d.count || "·"}
              </div>
              <span className="text-[9px] text-white/30">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Accuracy */}
      <div className="bg-card rounded-xl border border-white/10 p-4 text-center">
        <p className="text-2xl font-bold text-accent-light">{accuracy}%</p>
        <p className="text-xs text-white/40">Accuracy (Good + Easy)</p>
      </div>

      {/* Cards by Level */}
      <div className="bg-card rounded-xl border border-white/10 p-4 space-y-2">
        <h2 className="text-sm font-medium text-white/60">Cards by Level</h2>
        {["A1", "A2", "B1", "B2"].map((lvl) => {
          const s = levelStats[lvl] || { total: 0, mastered: 0 };
          return (
            <div key={lvl} className="flex items-center justify-between">
              <span className="text-sm font-medium">{lvl}</span>
              <span className="text-xs text-white/40">
                {s.mastered} mastered / {s.total} total
              </span>
            </div>
          );
        })}
      </div>

      {/* Cards by Status */}
      <div className="bg-card rounded-xl border border-white/10 p-4 space-y-2">
        <h2 className="text-sm font-medium text-white/60">Cards by Status</h2>
        {[
          { label: "New", value: statusStats.new, color: "text-white/60" },
          { label: "Learning (<7d)", value: statusStats.learning, color: "text-warn" },
          { label: "Review (7-30d)", value: statusStats.review, color: "text-accent-light" },
          { label: "Mastered (>30d)", value: statusStats.mastered, color: "text-success" },
        ].map((s) => (
          <div key={s.label} className="flex items-center justify-between">
            <span className="text-sm">{s.label}</span>
            <span className={cn("text-sm font-medium", s.color)}>{s.value}</span>
          </div>
        ))}
      </div>

      {/* Topic Coverage */}
      {tagStats.length > 0 && (
        <div className="bg-card rounded-xl border border-white/10 p-4 space-y-2">
          <h2 className="text-sm font-medium text-white/60">Topic Coverage</h2>
          {tagStats.slice(0, 8).map((t) => (
            <div key={t.tag} className="flex items-center justify-between">
              <span className="text-sm">{t.tag}</span>
              <span className="text-xs text-white/40">{t.count} practiced</span>
            </div>
          ))}
        </div>
      )}

      {/* Recent Sessions */}
      {last7.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-white/60">Recent Sessions</h2>
          {last7.map((s, i) => (
            <div key={i} className="bg-card rounded-xl border border-white/10 p-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{s.topic}</p>
                <p className="text-xs text-white/40">{s.date} • {Math.floor(s.duration / 60)}min</p>
              </div>
              <div className="text-right">
                <p className="text-xs">
                  {s.errorsCount === 0 ? (
                    <span className="text-success">Perfect ✓</span>
                  ) : (
                    <span className="text-warn">{s.errorsCount} errors</span>
                  )}
                </p>
                <p className="text-xs text-white/30">{s.feedback}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {sessions.length === 0 && (
        <div className="text-center py-8">
          <p className="text-white/40">No sessions yet. Start a lesson to see your stats!</p>
        </div>
      )}
    </main>
  );
}
