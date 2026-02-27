"use client";

import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import { ChevronLeft, ChevronRight, BookOpen, ExternalLink, Headphones, PlayCircle, FileText } from "lucide-react";
import { cn } from "../../lib/cn";
import { getNowWarsaw } from "../../lib/date";

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return { firstDay, daysInMonth };
}

function formatDate(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type DayStatus = "completed" | "missed" | "available" | "today" | "empty" | "future";

interface DayInfo {
  date: string;
  day: number;
  status: DayStatus;
  lessonType?: string;
  topic?: string;
}

const resourceIcon = {
  podcast: Headphones,
  video: PlayCircle,
  article: FileText,
};

export default function CalendarPage() {
  const { year: wYear, month: wMonth, dateStr: todayStr } = getNowWarsaw();
  const [year, setYear] = useState(wYear);
  const [month, setMonth] = useState(wMonth);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Range for the visible month
  const from = formatDate(year, month, 1);
  const to = formatDate(year, month, new Date(year, month + 1, 0).getDate());

  const lessons = useQuery(api.lessons.listRange, { from, to });
  const sessions = useQuery(api.sessions.getByDateRange, { from, to });

  const { firstDay, daysInMonth } = getMonthDays(year, month);
  // Shift to Mon=0 (firstDay from JS is Sun=0)
  const startOffset = (firstDay + 6) % 7;

  const lessonMap = useMemo(() => {
    const map: Record<string, (typeof lessons extends (infer T)[] | undefined ? T : never)> = {};
    if (lessons) for (const l of lessons) map[l.date] = l;
    return map;
  }, [lessons]);

  const sessionDates = useMemo(() => {
    const set = new Set<string>();
    if (sessions) for (const s of sessions) set.add(s.date);
    return set;
  }, [sessions]);

  const days: (DayInfo | null)[] = useMemo(() => {
    const result: (DayInfo | null)[] = [];
    // Padding for start of month
    for (let i = 0; i < startOffset; i++) result.push(null);

    for (let d = 1; d <= daysInMonth; d++) {
      const date = formatDate(year, month, d);
      const hasLesson = !!lessonMap[date];
      const hasSession = sessionDates.has(date);
      const isFuture = date > todayStr;
      const isToday = date === todayStr;

      let status: DayStatus;
      if (isFuture) {
        status = hasLesson ? "available" : "future";
      } else if (isToday) {
        status = hasSession ? "completed" : "today";
      } else if (hasSession) {
        status = "completed";
      } else if (hasLesson) {
        status = "missed";
      } else {
        status = "empty";
      }

      result.push({
        date,
        day: d,
        status,
        lessonType: lessonMap[date]?.type,
        topic: lessonMap[date]?.topic,
      });
    }
    return result;
  }, [year, month, daysInMonth, startOffset, lessonMap, sessionDates, todayStr]);

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

  const selectedLesson = selectedDate ? lessonMap[selectedDate] : null;
  const selectedSessions = selectedDate && sessions
    ? sessions.filter((s) => s.date === selectedDate)
    : [];

  // Count missed
  const missedCount = days.filter((d) => d?.status === "missed").length;

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

      {/* Missed banner */}
      {missedCount > 0 && (
        <div className="bg-danger/10 border border-danger/20 rounded-xl px-4 py-2 text-center">
          <p className="text-sm text-danger">{missedCount} missed lesson{missedCount > 1 ? "s" : ""} — tap to catch up</p>
        </div>
      )}

      {/* Calendar grid */}
      <div className="bg-card rounded-2xl border border-white/10 p-3">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {WEEKDAYS.map((d) => (
            <div key={d} className="text-center text-[10px] text-white/30 font-medium py-1">{d}</div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, i) => {
            if (!day) return <div key={`pad-${i}`} />;

            const isSelected = selectedDate === day.date;
            const isWeekend = day.lessonType === "weekly_review" || day.lessonType === "weekend";

            return (
              <button
                key={day.date}
                onClick={() => setSelectedDate(isSelected ? null : day.date)}
                className={cn(
                  "relative aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition",
                  isSelected && "ring-2 ring-accent",
                  day.status === "completed" && "bg-success/15 text-success",
                  day.status === "missed" && "bg-danger/15 text-danger",
                  day.status === "available" && "bg-accent/10 text-accent-light",
                  day.status === "today" && "bg-accent/20 text-white font-bold",
                  day.status === "empty" && "text-white/20",
                  day.status === "future" && "text-white/15",
                )}
              >
                <span>{day.day}</span>
                {/* Dot indicator */}
                {day.status === "completed" && (
                  <span className="absolute bottom-0.5 w-1.5 h-1.5 rounded-full bg-success" />
                )}
                {day.status === "missed" && (
                  <span className="absolute bottom-0.5 w-1.5 h-1.5 rounded-full bg-danger" />
                )}
                {(day.status === "available" || day.status === "today") && day.lessonType && (
                  <span className="absolute bottom-0.5 w-1.5 h-1.5 rounded-full bg-accent" />
                )}
                {isWeekend && (
                  <span className="absolute top-0.5 right-0.5 text-[8px]">
                    {day.lessonType === "weekly_review" ? "📋" : "🎧"}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-3 pt-2 border-t border-white/5">
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success" /><span className="text-[10px] text-white/30">Done</span></div>
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-danger" /><span className="text-[10px] text-white/30">Missed</span></div>
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent" /><span className="text-[10px] text-white/30">Available</span></div>
        </div>
      </div>

      {/* Selected day detail */}
      {selectedDate && (
        <div className="bg-card rounded-2xl border border-white/10 p-4 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-white/60">
              {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
            </h2>
            {selectedLesson && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/20 text-accent-light">
                {selectedLesson.level}
              </span>
            )}
          </div>

          {selectedLesson ? (
            <>
              {/* Lesson info */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{selectedLesson.topic}</h3>
                <p className="text-sm text-white/50 italic">&ldquo;{selectedLesson.question}&rdquo;</p>
                {selectedLesson.grammarFocus && (
                  <p className="text-xs text-white/30">Grammar: {selectedLesson.grammarFocus}</p>
                )}
                <p className="text-xs text-white/30 capitalize">Type: {selectedLesson.type.replace("_", " ")}</p>
              </div>

              {/* Weekend resources */}
              {selectedLesson.resources && selectedLesson.resources.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-white/40 uppercase tracking-wider">Passive Learning</h4>
                  {selectedLesson.resources.map((r, i) => {
                    const Icon = resourceIcon[r.type] || FileText;
                    return (
                      <a
                        key={i}
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-white/5 rounded-xl p-3 hover:bg-white/10 transition"
                      >
                        <Icon size={18} className="text-accent-light flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{r.title}</p>
                          {r.description && <p className="text-xs text-white/40 truncate">{r.description}</p>}
                        </div>
                        <ExternalLink size={14} className="text-white/20 flex-shrink-0" />
                      </a>
                    );
                  })}
                </div>
              )}

              {/* Week summary for weekly_review */}
              {selectedLesson.weekSummary && (
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white/5 rounded-lg p-2 text-center">
                    <p className="text-lg font-bold text-accent-light">{selectedLesson.weekSummary.sessionsCount}</p>
                    <p className="text-[10px] text-white/30">Sessions</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2 text-center">
                    <p className="text-lg font-bold text-warn">{selectedLesson.weekSummary.errorsCount}</p>
                    <p className="text-[10px] text-white/30">Errors</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2 text-center">
                    <p className="text-lg font-bold text-success">{selectedLesson.weekSummary.newPhrasesCount}</p>
                    <p className="text-[10px] text-white/30">New Phrases</p>
                  </div>
                </div>
              )}

              {/* Session results if completed */}
              {selectedSessions.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <h4 className="text-xs font-medium text-white/40 uppercase tracking-wider">Session Results</h4>
                  {selectedSessions.map((s) => (
                    <div key={s._id} className="flex items-center justify-between text-sm">
                      <div>
                        <span className="text-white/70">{s.topic || s.type}</span>
                        <span className="text-xs text-white/30 ml-2">{Math.floor(s.duration / 60)}min</span>
                      </div>
                      <div>
                        {s.errors.length === 0
                          ? <span className="text-success text-xs">Perfect ✓</span>
                          : <span className="text-warn text-xs">{s.errors.length} errors</span>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-2 pt-2">
                {selectedLesson.type !== "weekend" && (
                  <Link href={`/lesson/${selectedDate}`} className="flex-1">
                    <button className="w-full py-3 bg-accent rounded-xl text-sm font-medium hover:bg-accent/80 transition flex items-center justify-center gap-2">
                      <BookOpen size={16} />
                      {selectedSessions.length > 0 ? "Repeat Lesson" : selectedDate < todayStr ? "Catch Up" : "Start Lesson"}
                    </button>
                  </Link>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-white/30 text-sm">No lesson for this day</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
