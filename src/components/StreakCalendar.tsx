"use client";

import { cn } from "@/lib/cn";

interface StreakCalendarProps {
  /** Dates that had a completed session */
  sessionDates: Set<string>;
  /** Year/month to display (defaults to current) */
  year?: number;
  month?: number; // 0-indexed
}

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

export default function StreakCalendar({
  sessionDates,
  year,
  month,
}: StreakCalendarProps) {
  const now = new Date();
  const y = year ?? now.getFullYear();
  const m = month ?? now.getMonth();

  const firstDay = new Date(y, m, 1);
  const lastDay = new Date(y, m + 1, 0);
  const daysInMonth = lastDay.getDate();

  // Monday=0 adjustment (JS: 0=Sun, 1=Mon...)
  const startDow = (firstDay.getDay() + 6) % 7; // 0=Mon

  const today = now.toLocaleDateString("sv-SE", { timeZone: "Europe/Warsaw" });
  const monthName = firstDay.toLocaleDateString("en", { month: "short" });

  const cells: Array<{ day: number | null; dateStr: string | null }> = [];
  for (let i = 0; i < startDow; i++) cells.push({ day: null, dateStr: null });
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push({ day: d, dateStr });
  }

  const sessionCount = Array.from(sessionDates).filter(
    (d) => d.startsWith(`${y}-${String(m + 1).padStart(2, "0")}`)
  ).length;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <h3 className="text-xs text-white/40 font-medium">
          {monthName} {y}
        </h3>
        <span className="text-[10px] text-white/30">
          {sessionCount} {sessionCount === 1 ? "session" : "sessions"}
        </span>
      </div>
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-0.5 text-center">
        {DAY_LABELS.map((label, i) => (
          <span key={i} className="text-[9px] text-white/20 leading-none">
            {label}
          </span>
        ))}
      </div>
      {/* Calendar grid — compact */}
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((cell, i) => {
          if (!cell.day) {
            return <div key={i} className="h-5" />;
          }
          const hasSession = cell.dateStr ? sessionDates.has(cell.dateStr) : false;
          const isToday = cell.dateStr === today;
          const isPast = cell.dateStr ? cell.dateStr < today : false;

          return (
            <div
              key={i}
              className={cn(
                "h-5 rounded flex items-center justify-center text-[10px] transition",
                hasSession && "bg-success/30 text-success font-medium",
                !hasSession && isPast && "bg-white/5 text-white/20",
                !hasSession && !isPast && "text-white/15",
                isToday && "ring-1 ring-accent/50",
              )}
            >
              {cell.day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
