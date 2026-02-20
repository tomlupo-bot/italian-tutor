import type { VocabCard } from "../data/vocab";

// ─── User Vocab (mistakes + new phrases) ──────────────
const USER_VOCAB_KEY = "italian-tutor-user-vocab";

export function loadUserVocab(): VocabCard[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(USER_VOCAB_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveUserVocab(cards: VocabCard[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_VOCAB_KEY, JSON.stringify(cards));
}

export function addUserVocabCards(newCards: VocabCard[]) {
  const existing = loadUserVocab();
  const existingIds = new Set(existing.map((c) => c.id));
  const toAdd = newCards.filter((c) => !existingIds.has(c.id));
  saveUserVocab([...existing, ...toAdd]);
}

// ─── Session History ──────────────────────────────────
const SESSIONS_KEY = "italian-tutor-sessions";

export interface SessionRecord {
  date: string;
  topic: string;
  cardsReviewed: number;
  errorsCount: number;
  newPhrasesCount: number;
  feedback: string;
  duration: number; // seconds
}

export function loadSessions(): SessionRecord[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(SESSIONS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveSession(session: SessionRecord) {
  const sessions = loadSessions();
  sessions.push(session);
  if (typeof window !== "undefined") {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  }
}

export function getStreak(): number {
  const sessions = loadSessions();
  if (sessions.length === 0) return 0;
  const daily = loadDailyActivity();
  const allDates = new Set([
    ...sessions.map((s) => s.date),
    ...Object.keys(daily),
  ]);
  const dates = [...allDates].sort().reverse();
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  if (dates[0] !== today && dates[0] !== yesterday) return 0;

  let streak = 1;
  for (let i = 0; i < dates.length - 1; i++) {
    const curr = new Date(dates[i]);
    const prev = new Date(dates[i + 1]);
    const diff = (curr.getTime() - prev.getTime()) / 86400000;
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}

// ─── Settings ─────────────────────────────────────────
const SETTINGS_KEY = "italian-tutor-settings";

export type PracticeMode = "classic" | "reverse" | "listening" | "cloze";

export interface Settings {
  muted: boolean;
  dailyGoal: number;
  autoSpeak: boolean;
  speechRate: number;
  preferredMode: PracticeMode;
}

const DEFAULT_SETTINGS: Settings = {
  muted: false,
  dailyGoal: 20,
  autoSpeak: true,
  speechRate: 0.85,
  preferredMode: "classic",
};

export function loadSettings(): Settings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  const raw = localStorage.getItem(SETTINGS_KEY);
  if (!raw) return DEFAULT_SETTINGS;
  return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
}

export function saveSettings(settings: Partial<Settings>) {
  if (typeof window === "undefined") return;
  const current = loadSettings();
  const merged = { ...current, ...settings };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
}

// ─── Daily Activity Tracker ───────────────────────────
const DAILY_KEY = "italian-tutor-daily";

export interface DailyActivity {
  [date: string]: {
    cardsReviewed: number;
    qualities: number[]; // track quality ratings
  };
}

export function loadDailyActivity(): DailyActivity {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(DAILY_KEY);
  return raw ? JSON.parse(raw) : {};
}

export function saveDailyActivity(activity: DailyActivity) {
  if (typeof window === "undefined") return;
  localStorage.setItem(DAILY_KEY, JSON.stringify(activity));
}

export function recordCardReview(quality: number) {
  const activity = loadDailyActivity();
  const today = new Date().toISOString().split("T")[0];
  if (!activity[today]) {
    activity[today] = { cardsReviewed: 0, qualities: [] };
  }
  activity[today].cardsReviewed++;
  activity[today].qualities.push(quality);
  saveDailyActivity(activity);
}

export function getTodayReviewed(): number {
  const activity = loadDailyActivity();
  const today = new Date().toISOString().split("T")[0];
  return activity[today]?.cardsReviewed || 0;
}

// ─── Export All Data ──────────────────────────────────
export function exportAllData(): string {
  if (typeof window === "undefined") return "{}";
  const data: Record<string, unknown> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("italian-tutor")) {
      try {
        data[key] = JSON.parse(localStorage.getItem(key) || "null");
      } catch {
        data[key] = localStorage.getItem(key);
      }
    }
  }
  return JSON.stringify(data, null, 2);
}

// ─── Reset SRS Data ───────────────────────────────────
export function resetSRSData() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("italian-tutor-srs");
  localStorage.removeItem(DAILY_KEY);
}
