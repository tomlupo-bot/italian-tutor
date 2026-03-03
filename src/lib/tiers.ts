/**
 * Tier system: Bronze / Silver / Gold
 * Each tier has unique exercises that don't repeat.
 * All tiers are always available. Completion + best score tracked per tier per date.
 */

export type Tier = "bronze" | "silver" | "gold";

export interface TierConfig {
  tier: Tier;
  label: string;
  emoji: string;
  duration: string;
  description: string;
  color: string;
  borderColor: string;
  phases: ("vocab" | "exercises" | "conversation")[];
}

export const TIERS: TierConfig[] = [
  {
    tier: "bronze",
    label: "Bronze",
    emoji: "🥉",
    duration: "~5 min",
    description: "Vocab flashcards + fill-in-the-blank",
    color: "from-amber-700/20 to-amber-800/5",
    borderColor: "border-amber-600/30",
    phases: ["vocab", "exercises"],
  },
  {
    tier: "silver",
    label: "Silver",
    emoji: "🥈",
    duration: "~10 min",
    description: "Vocab review + grammar drills + translation",
    color: "from-slate-400/20 to-slate-500/5",
    borderColor: "border-slate-400/30",
    phases: ["vocab", "exercises"],
  },
  {
    tier: "gold",
    label: "Gold",
    emoji: "🥇",
    duration: "~15 min",
    description: "Full lesson with conversation scenario",
    color: "from-yellow-500/20 to-yellow-600/5",
    borderColor: "border-yellow-500/30",
    phases: ["vocab", "exercises", "conversation"],
  },
];

// ── Tier completion storage ──────────────────────────

const TIER_KEY = "italian-tutor-tiers";

export interface TierResult {
  completed: boolean;
  score: number; // 0-100 percentage
  bestScore: number;
  completedAt?: string; // ISO timestamp
  rating?: number; // 1-5 self-rating
}

export interface DateTiers {
  [date: string]: {
    [tier in Tier]?: TierResult;
  };
}

export function loadTierData(): DateTiers {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(TIER_KEY);
  return raw ? JSON.parse(raw) : {};
}

export function saveTierResult(date: string, tier: Tier, result: Omit<TierResult, "bestScore">) {
  const data = loadTierData();
  if (!data[date]) data[date] = {};
  const prev = data[date][tier];
  const bestScore = Math.max(result.score, prev?.bestScore ?? 0);
  data[date][tier] = { ...result, bestScore };
  if (typeof window !== "undefined") {
    localStorage.setItem(TIER_KEY, JSON.stringify(data));
  }
  return data[date][tier]!;
}

export function getTierResult(date: string, tier: Tier): TierResult | null {
  const data = loadTierData();
  return data[date]?.[tier] ?? null;
}

export function getDateCompletion(date: string): { completed: number; total: number; tiers: Record<Tier, boolean> } {
  const data = loadTierData();
  const dateTiers = data[date] ?? {};
  const tiers: Record<Tier, boolean> = {
    bronze: dateTiers.bronze?.completed ?? false,
    silver: dateTiers.silver?.completed ?? false,
    gold: dateTiers.gold?.completed ?? false,
  };
  const completed = Object.values(tiers).filter(Boolean).length;
  return { completed, total: 3, tiers };
}
