// SM-2 Algorithm implementation
export interface SRSCard {
  id: string;
  easeFactor: number; // >= 1.3
  interval: number; // days
  repetitions: number;
  nextReview: string; // ISO date
  lastReview?: string;
}

export type Quality = 0 | 1 | 2 | 3 | 4 | 5;

export function sm2(card: SRSCard, quality: Quality): SRSCard {
  const ef = Math.max(1.3, card.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

  let interval: number;
  let repetitions: number;

  if (quality < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    repetitions = card.repetitions + 1;
    if (repetitions === 1) interval = 1;
    else if (repetitions === 2) interval = 6;
    else interval = Math.round(card.interval * ef);
  }

  const next = new Date();
  next.setDate(next.getDate() + interval);

  return {
    ...card,
    easeFactor: ef,
    interval,
    repetitions,
    nextReview: next.toISOString().split("T")[0],
    lastReview: new Date().toISOString().split("T")[0],
  };
}

const STORAGE_KEY = "italian-tutor-srs";

export function loadSRS(): Record<string, SRSCard> {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}

export function saveSRS(cards: Record<string, SRSCard>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

export function getOrCreateCard(cards: Record<string, SRSCard>, id: string): SRSCard {
  if (cards[id]) return cards[id];
  return {
    id,
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    nextReview: new Date().toISOString().split("T")[0],
  };
}

export function getDueCards(cards: Record<string, SRSCard>, allIds: string[]): string[] {
  const today = new Date().toISOString().split("T")[0];
  return allIds.filter((id) => {
    const card = cards[id];
    if (!card) return true; // new card
    return card.nextReview <= today;
  });
}

// Map feedback to SM-2 quality
export function feedbackToQuality(feedback: "easy" | "good" | "hard"): Quality {
  switch (feedback) {
    case "easy": return 5;
    case "good": return 3;
    case "hard": return 1;
  }
}
