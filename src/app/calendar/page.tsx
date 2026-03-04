"use client";

import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { cn } from "../../lib/cn";
import { getNowWarsaw } from "../../lib/date";

function formatDate(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type DayStatus = "all_done" | "partial" | "available" | "today" | "empty" | "future";

interface DayInfo {
  date: string;
  day: number;
  status: DayStatus;
  total?: number;
  completed?: number;
  types?: string[];
}

const TYPE_LABELS: Record<string, string> = {
  srs: "Flashcards",
  cloze: "Fill-in-blank",
  word_builder: "Word builder",
  pattern_drill: "Pattern drill",
  speed_translation: "Speed translation",
  error_hunt: "Error hunt",
  conversation: "Conversation",
  reflection: "Reflection",
};

export default function CalendarPage() {
  const { year: wYear, month: wMonth, dateStr: todayStr } = getNowWarsaw();
  const [year, setYear] = useState(wYear);
  const [month, setMonth] = useState(wMonth);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const from = formatDate(year, month, 1);
  const to = formatDate(year, month, new Date(year, month + 1, 0).getDate());

  const exerciseSummaries = useQuery(api.exercises.getDateSummaries, { from, to });
  const sessions = useQuery(api.sessions.getByDateRange, { from, to });

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const startOffset = (firstDayOfMonth + 6) % 7; // Mon=0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const exerciseMap = useMemo(() => {
    const map: Record<string, { total: number; completed: number; types: string[] }> = {};
    if (exerciseSummaries) {
      for (const s of exerciseSummaries) map[s.date] = s;
    }
    return map;
  }, [exerciseSummaries]);

  const sessionDates = useMemo(() => {
    const set = new Set<string>();
    if (sessions) for (const s of sessions) set.add(s.date);
    return set;
  }, [sessions]);

  const days: (DayInfo | null)[] = useMemo(() => {
    const result: (DayInfo | null)[] = [];
    for (let i = 0; i < startOffset; i++) result.push(null);

    for (let d = 1; d <= daysInMonth; d++) {
      const date = formatDate(year, month, d);
      const ex = exerciseMap[date];
      const hasSession = sessionDates.has(date);
      const isFuture = date > todayStr;
      const isToday = date === todayStr;

      let status: DayStatus;
      if (isFuture) {
        status = ex ? "available" : "future";
      } else if (isToday) {
        if (ex && ex.completed === ex.total) status = "all_done";
        else if (hasSession || (ex && ex.completed > 0)) status = "partial";
        else status = ex ? "today" : "empty";
      } else if (ex && ex.completed === ex.total && ex.total > 0) {
        status = "all_done";
      } else if (hasSession || (ex && ex.completed > 0)) {
        status = "partial";
      } else if (ex) {
        status = "available"; // past day with unfinished exercises
      } else {
        status = "empty";
      }

      result.push({
        date,
        day: d,
        status,
        total: ex?.total,
        completed: ex?.completed,
        types: ex?.types,
      });
    }
    return result;
  }, [year, month, daysInMonth, startOffset, exerciseMap, sessionDates, todayStr]);

  const prevMonth = () => {
    if (month === 0) { setYear(year - 1); setMonth(11); }
    else setMonth(month - 1);
    setSelectedDate(null);
  };
  const nextMonth = () => {
    if (month === 11) { setYear(year + 1); setMonth(0); }
    else setMonth(month + 1);
    setSelectedDate(null);
  };

  const selectedEx = selectedDate ? exerciseMap[selectedDate] : null;
  const selectedSessions = selectedDate && sessions
    ? sessions.filter((s) => s.date === selectedDate)
    : [];

  const monthName = new Date(year, month).toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <main className="min-h-screen max-w-lg mx-auto pb-20 px-4 py-6 space-y-4">
      {/* Month nav */}
      <div className="flex items-center justify-between">
        <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-white/5 transition">
          <ChevronLeft size={20} className="text-white/60" />
        </button>
        <h1 className="text-lg font-semibold">{monthName}</h1>
        <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-white/5 transition">
          <ChevronRight size={20} className="text-white/60" />
        </button>
      </div>

      {/* Calendar grid */}
      <div className="bg-card rounded-2xl border border-white/10 p-3">
        <div className="grid grid-cols-7 gap-1 mb-1">
          {WEEKDAYS.map((d) => (
            <div key={d} className="text-center text-[10px] text-white/30 font-medium py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, i) => {
            if (!day) return <div key={`pad-${i}`} />;

            const isSelected = selectedDate === day.date;

            return (
              <button
                key={day.date}
                onClick={() => setSelectedDate(isSelected ? null : day.date)}
                className={cn(
                  "relative aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition",
                  isSelected && "ring-2 ring-accent",
                  day.status === "all_done" && "bg-success/15 text-success",
                  day.status === "partial" && "bg-warn/15 text-warn",
                  day.status === "available" && "bg-accent/10 text-accent-light",
                  day.status === "today" && "bg-accent/20 text-white font-bold",
                  day.status === "empty" && "text-white/20",
                  day.status === "future" && "text-white/15",
                )}
              >
                <span>{day.day}</span>
                {day.status === "all_done" && (
                  <span className="absolute bottom-0.5 w-1.5 h-1.5 rounded-full bg-success" />
                )}
                {day.status === "partial" && (
                  <span className="absolute bottom-0.5 w-1.5 h-1.5 rounded-full bg-warn" />
                )}
                {(day.status === "available" || day.status === "today") && day.total && (
                  <span className="absolute bottom-0.5 w-1.5 h-1.5 rounded-full bg-accent" />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-3 pt-2 border-t border-white/5">
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success" /><span className="text-[10px] text-white/30">Done</span></div>
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warn" /><span className="text-[10px] text-white/30">Partial</span></div>
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent" /><span className="text-[10px] text-white/30">Ready</span></div>
        </div>
      </div>

      {/* Selected day detail */}
      {selectedDate && (
        <div className="bg-card rounded-2xl border border-white/10 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-white/60">
              {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
            </h2>
            {selectedEx && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/50">
                {selectedEx.completed}/{selectedEx.total} done
              </span>
            )}
          </div>

          {selectedEx ? (
            <>
              {/* Exercise types */}
              <div className="flex flex-wrap gap-1.5">
                {selectedEx.types.map((type) => (
                  <span
                    key={type}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent-light"
                  >
                    {TYPE_LABELS[type] || type}
                  </span>
                ))}
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-success rounded-full transition-all"
                    style={{ width: `${(selectedEx.completed / selectedEx.total) * 100}%` }}
                  />
                </div>
                <p className="text-[10px] text-white/30 text-right">
                  {selectedEx.completed === selectedEx.total
                    ? "All exercises completed"
                    : `${selectedEx.total - selectedEx.completed} exercises remaining`}
                </p>
              </div>

              {/* Session results if any */}
              {selectedSessions.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-white/5">
                  <h4 className="text-[10px] font-medium text-white/40 uppercase tracking-wider">Sessions</h4>
                  {selectedSessions.map((s) => (
                    <div key={s._id} className="flex items-center justify-between text-xs">
                      <span className="text-white/70 capitalize">{s.mode || s.type}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white/30">{s.exercisesCompleted}/{s.exercisesTotal}</span>
                        {s.errors.length === 0
                          ? <span className="text-success">Perfect</span>
                          : <span className="text-warn">{s.errors.length} errors</span>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Action button */}
              {selectedEx.completed < selectedEx.total && (
                <Link href={`/session/${selectedDate}`}>
                  <button className="w-full py-3 bg-accent rounded-xl text-sm font-medium hover:bg-accent/80 transition flex items-center justify-center gap-2">
                    <BookOpen size={16} />
                    {selectedEx.completed > 0 ? "Continue" : selectedDate < todayStr ? "Catch Up" : "Start"}
                  </button>
                </Link>
              )}
            </>
          ) : (
            <div className="text-center py-3">
              <p className="text-white/30 text-sm">No exercises for this day</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
