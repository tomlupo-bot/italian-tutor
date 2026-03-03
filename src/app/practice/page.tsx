"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { VocabCard } from "../../data/vocab";
import Flashcard, { speakItalian } from "../../components/Flashcard";
import type { CardMode } from "../../components/Flashcard";
import { cn } from "../../lib/cn";
import { Loader2 } from "lucide-react";

const MODES: { key: CardMode; label: string; icon: string }[] = [
  { key: "classic", label: "Classic", icon: "🇮🇹→🇬🇧" },
  { key: "reverse", label: "Reverse", icon: "🇬🇧→🇮🇹" },
  { key: "listening", label: "Listening", icon: "🎧" },
  { key: "cloze", label: "Cloze", icon: "📝" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ConvexCard = Record<string, any>;

function toVocabCard(card: ConvexCard): VocabCard {
  return {
    id: card._id,
    it: card.it,
    en: card.en,
    ex: card.example || card.it,
    tag: card.tag || card.errorCategory,
  };
}

export default function PracticePage() {
  const dueCards = useQuery(api.cards.getDue, { limit: 50 });
  const reviewCard = useMutation(api.cards.review);

  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [totalQuality, setTotalQuality] = useState(0);
  const [done, setDone] = useState(false);
  const [mode, setMode] = useState<CardMode>("classic");

  const cards = dueCards ?? [];
  const currentCard = cards[idx] as ConvexCard | undefined;

  // Auto-speak on card change
  useEffect(() => {
    if (!currentCard || done) return;
    if (mode === "classic" || mode === "listening") {
      speakItalian(currentCard.it, 0.85);
    }
  }, [idx, currentCard, mode, done]);

  // Auto-speak Italian when reverse card is flipped
  useEffect(() => {
    if (!currentCard || mode !== "reverse" || !flipped) return;
    speakItalian(currentCard.it, 0.85);
  }, [flipped, mode, currentCard]);

  const handleFeedback = useCallback(
    (quality: 1 | 3 | 5) => {
      if (!currentCard) return;

      reviewCard({
        cardId: currentCard._id,
        quality,
      }).catch(() => {});

      setTotalQuality((prev) => prev + quality);
      setReviewed((prev) => prev + 1);
      setFlipped(false);

      if (idx < cards.length - 1) {
        setIdx((i) => i + 1);
      } else {
        setDone(true);
      }
    },
    [currentCard, idx, cards.length, reviewCard],
  );

  // Loading
  if (dueCards === undefined) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="text-accent animate-spin" />
      </main>
    );
  }

  // No cards due
  if (cards.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center max-w-lg mx-auto pb-20 px-4 gap-4">
        <div className="text-5xl">🎉</div>
        <h2 className="text-xl font-semibold">All caught up!</h2>
        <p className="text-white/50 text-sm">No cards due for review</p>
        <p className="text-white/30 text-xs text-center">
          Cards are created from your exercise mistakes.
          <br />
          Complete a lesson to generate new cards.
        </p>
      </main>
    );
  }

  // Session complete
  if (done) {
    const avg = reviewed > 0 ? (totalQuality / reviewed).toFixed(1) : "0";
    return (
      <main className="min-h-screen flex flex-col items-center justify-center max-w-lg mx-auto pb-20 px-4 gap-6">
        <div className="text-5xl">✅</div>
        <h2 className="text-xl font-semibold">Practice Complete!</h2>
        <div className="flex gap-6 text-center">
          <div>
            <p className="text-2xl font-bold text-accent-light">{reviewed}</p>
            <p className="text-xs text-white/40">Reviewed</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-success">{avg}</p>
            <p className="text-xs text-white/40">Avg Quality</p>
          </div>
        </div>
      </main>
    );
  }

  if (!currentCard) return null;
  const vocabCard = toVocabCard(currentCard);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center max-w-lg mx-auto pb-20 px-4 gap-4">
      {/* Mode selector */}
      <div className="flex gap-2 flex-wrap justify-center">
        {MODES.map((m) => (
          <button
            key={m.key}
            onClick={() => {
              setMode(m.key);
              setFlipped(false);
            }}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition",
              mode === m.key
                ? "bg-accent text-white"
                : "bg-white/5 text-white/40 hover:bg-white/10",
            )}
          >
            {m.icon} {m.label}
          </button>
        ))}
      </div>

      <div className="text-center">
        <h2 className="text-lg font-semibold text-accent-light">
          SRS Practice
        </h2>
        <p className="text-white/40 text-sm">
          {idx + 1} / {cards.length} due
        </p>
        <div className="w-48 h-1.5 bg-white/5 rounded-full mt-2 mx-auto">
          <div
            className="h-full bg-accent rounded-full transition-all"
            style={{ width: `${(reviewed / cards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Card source badge */}
      {currentCard.source === "correction" && (
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-warn/20 text-warn">
          From your mistakes
        </span>
      )}

      <Flashcard
        card={vocabCard}
        flipped={flipped}
        onFlip={() => setFlipped(!flipped)}
        mode={mode}
        speechRate={0.85}
      />

      {flipped ? (
        <div className="flex gap-3">
          <button
            onClick={() => handleFeedback(1)}
            className="px-5 py-3 rounded-xl bg-danger/20 border border-danger/30 hover:bg-danger/30 transition text-sm font-medium"
          >
            Again
          </button>
          <button
            onClick={() => handleFeedback(3)}
            className="px-5 py-3 rounded-xl bg-warn/20 border border-warn/30 hover:bg-warn/30 transition text-sm font-medium"
          >
            Good
          </button>
          <button
            onClick={() => handleFeedback(5)}
            className="px-5 py-3 rounded-xl bg-success/20 border border-success/30 hover:bg-success/30 transition text-sm font-medium"
          >
            Easy
          </button>
        </div>
      ) : (
        <p className="text-white/20 text-xs">Tap card to flip</p>
      )}
    </main>
  );
}
