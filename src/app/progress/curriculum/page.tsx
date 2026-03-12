"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { ArrowLeft, Loader2 } from "lucide-react";

import { api } from "../../../../convex/_generated/api";
import { DashboardShell } from "@/components/layout/ScreenShell";
import { withBasePath } from "@/lib/paths";
import { PATTERN_FOCUS_CONFIG, type PatternFocusKey } from "@/lib/patternFocus";

export default function CurriculumAuditPage() {
  const summary = useQuery(api.contentAudit.getCurriculumSummary, {});

  if (summary === undefined) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-accent" />
      </main>
    );
  }

  return (
    <DashboardShell contentClassName="gap-6">
      <div className="flex items-center gap-3">
        <Link href={withBasePath("/progress")} className="rounded-lg p-2 -ml-2 text-white/50 transition hover:bg-white/5 hover:text-white">
          <ArrowLeft size={20} />
        </Link>
        <div className="space-y-0.5">
          <h1 className="text-lg font-semibold">Curriculum Audit</h1>
          <p className="text-xs text-white/35">Live coverage for cards, templates, lanes, and metadata distribution.</p>
        </div>
      </div>

      <section className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-card p-4 space-y-3">
          <p className="text-[11px] uppercase tracking-wider text-accent-light">Top patterns</p>
          <div className="space-y-2">
            {summary.topPatterns.slice(0, 8).map((row) => (
              <div key={row.patternId} className="flex items-center justify-between text-sm">
                <span className="text-white/70">{row.patternId}</span>
                <span className="text-white/40">{row.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-card p-4 space-y-3">
          <p className="text-[11px] uppercase tracking-wider text-accent-light">Top domains</p>
          <div className="space-y-2">
            {summary.topDomains.slice(0, 8).map((row) => (
              <div key={row.domain} className="flex items-center justify-between text-sm">
                <span className="text-white/70">{row.domain}</span>
                <span className="text-white/40">{row.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        {summary.levels.map((levelRow) => (
          <div key={levelRow.level} className="rounded-2xl border border-white/10 bg-card p-4 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-accent-light">{levelRow.level}</p>
                <p className="text-sm text-white/45">
                  {levelRow.cards} cards • {levelRow.templates} templates
                </p>
              </div>
              <div className="flex gap-2 text-xs text-white/45">
                {levelRow.phaseCounts.map((phase) => (
                  <span key={phase.phase} className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-1">
                    {phase.phase}: {phase.cards}/{phase.templates}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {levelRow.lanes.map((lane) => {
                const meta = PATTERN_FOCUS_CONFIG[lane.patternKey as PatternFocusKey];
                return (
                  <div key={lane.patternKey} className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium">{meta?.label ?? lane.patternKey}</p>
                        <p className="text-[11px] text-white/35">{meta?.preview}</p>
                      </div>
                      <div className="text-right text-xs text-white/45">
                        <div>{lane.cards} cards</div>
                        <div>{lane.templates} templates</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </DashboardShell>
  );
}
