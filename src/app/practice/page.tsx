"use client";

import { useState, useEffect } from "react";
import { vocab, type VocabCard } from "../../data/vocab";
import { loadSRS, saveSRS, getOrCreateCard, sm2, getDueCards, type Quality } from "../../lib/srs";
import { loadUserVocab, loadSettings, recordCardReview } from "../../lib/storage";
import Flashcard, { speakItalian } from "../../components/Flashcard";
import type { CardMode } from "../../components/Flashcard";
import { cn } from "../../lib/cn";

const MODES: { key: CardMode; label: string; icon: string }[] = [
  { key: "classic", label: "Classic", icon: "🇮🇹→🇬🇧" },
  { key: "reverse", label: "Reverse", icon: "🇬🇧→🇮🇹" },
  { key: "listening", label: "Listening", icon: "🎧" },
  { key: "cloze", label: "Cloze", icon: "📝" },
];

const LEVELS = ["All", "A1", "A2", "B1", "B2"] as const;

export default function PracticePage() {
  const [dueCards, setDueCards] = useState<VocabCard[]>([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [totalQuality, setTotalQuality] = useState(0);
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<CardMode>("classic");
  const [levelFilter, setLevelFilter] = useState<string>("All");
  const [speechRate, setSpeechRate] = useState(0.85);

  const loadCards = (lvl: string) => {
    const allVocab = [...vocab, ...loadUserVocab()];
    const filtered = lvl === "All" ? allVocab : allVocab.filter((v) => v.level === lvl);
    const srs = loadSRS();
    const dueIds = getDueCards(srs, filtered.map((v) => v.id));
    const shuffled = dueIds.sort(() => Math.random() - 0.5);
    return shuffled.map((id) => filtered.find((v) => v.id === id)!).filter(Boolean);
  };

  useEffect(() => {
    const settings = loadSettings();
    setMode(settings.preferredMode || "classic");
    setSpeechRate(settings.speechRate || 0.85);
    const cards = loadCards("All");
    setDueCards(cards);
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-speak on card change based on mode
  useEffect(() => {
    if (!mounted || !dueCards[idx]) return;
    const settings = loadSettings();
    if (!settings.autoSpeak || settings.muted) return;

    if (mode === "classic") {
      speakItalian(dueCards[idx].it, speechRate);
    } else if (mode === "listening") {
      speakItalian(dueCards[idx].it, speechRate);
    }
    // Reverse: speak on flip (handled below)
    // Cloze: no auto-speak
  }, [idx, dueCards, mode, mounted, speechRate]);

  // Auto-speak Italian when reverse card is flipped
  useEffect(() => {
    if (!mounted || !dueCards[idx] || mode !== "reverse" || !flipped) return;
    const settings = loadSettings();
    if (!settings.muted) {
      speakItalian(dueCards[idx].it, speechRate);
    }
  }, [flipped, mode, mounted, dueCards, idx, speechRate]);

  const handleLevelChange = (lvl: string) => {
    setLevelFilter(lvl);
    const cards = loadCards(lvl);
    setDueCards(cards);
    setIdx(0);
    setFlipped(false);
    setReviewed(0);
    setTotalQuality(0);
    setDone(false);
  };

  const handleFeedback = (quality: Quality) => {
    const card = dueCards[idx];
    const srs = loadSRS();
    const current = getOrCreateCard(srs, card.id);
    srs[card.id] = sm2(current, quality);
    saveSRS(srs);
    recordCardReview(quality);

    setTotalQuality((prev) => prev + quality);
    setReviewed((prev) => prev + 1);
    setFlipped(false);

    if (idx < dueCards.length - 1) {
      setIdx(idx + 1);
    } else {
      setDone(true);
    }
  };

  if (!mounted) {
    return (
      <main className="min-h-screen flex items-center justify-center max-w-lg mx-auto pb-20">
        <p className="text-white/40">Loading...</p>
      </main>
    );
  }

  if (dueCards.length === 0) {
    const allVocab = [...vocab, ...loadUserVocab()];
    const filtered = levelFilter === "All" ? allVocab : allVocab.filter((v) => v.level === levelFilter);
    return (
      <main className="min-h-screen flex flex-col items-center justify-center max-w-lg mx-auto pb-20 px-4 gap-4">
        <div className="text-5xl">🎉</div>
        <h2 className="text-xl font-semibold">All caught up!</h2>
        <p className="text-white/50 text-sm">{filtered.length} cards{levelFilter !== "All" ? ` (${levelFilter})` : ""} • No reviews due</p>
        {/* Level filter */}
        <div className="flex gap-2 flex-wrap justify-center">
          {LEVELS.map((lvl) => (
            <button
              key={lvl}
              onClick={() => handleLevelChange(lvl)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition",
                levelFilter === lvl ? "bg-accent text-white" : "bg-white/5 text-white/40 hover:bg-white/10"
              )}
            >
              {lvl}
            </button>
          ))}
        </div>
        <p className="text-white/30 text-xs">Come back later for more practice</p>
      </main>
    );
  }

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
        <button
          onClick={() => {
            const cards = loadCards(levelFilter);
            setDueCards(cards);
            setIdx(0);
            setFlipped(false);
            setReviewed(0);
            setTotalQuality(0);
            setDone(cards.length === 0);
          }}
          className="px-6 py-3 bg-accent rounded-xl font-medium hover:bg-accent/80 transition"
        >
          Practice Again
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center max-w-lg mx-auto pb-20 px-4 gap-4">
      {/* Mode selector */}
      <div className="flex gap-2 flex-wrap justify-center">
        {MODES.map((m) => (
          <button
            key={m.key}
            onClick={() => { setMode(m.key); setFlipped(false); }}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition",
              mode === m.key ? "bg-accent text-white" : "bg-white/5 text-white/40 hover:bg-white/10"
            )}
          >
            {m.icon} {m.label}
          </button>
        ))}
      </div>

      {/* Level filter */}
      <div className="flex gap-1.5 justify-center">
        {LEVELS.map((lvl) => (
          <button
            key={lvl}
            onClick={() => handleLevelChange(lvl)}
            className={cn(
              "px-2.5 py-1 rounded-full text-[10px] font-medium transition",
              levelFilter === lvl ? "bg-white/10 text-white" : "bg-white/5 text-white/30 hover:bg-white/10"
            )}
          >
            {lvl}
          </button>
        ))}
      </div>

      <div className="text-center">
        <h2 className="text-lg font-semibold text-accent-light">🔄 SRS Practice</h2>
        <p className="text-white/40 text-sm">
          {idx + 1} / {dueCards.length} due
        </p>
        <div className="w-48 h-1.5 bg-white/5 rounded-full mt-2 mx-auto">
          <div
            className="h-full bg-accent rounded-full transition-all"
            style={{ width: `${(reviewed / dueCards.length) * 100}%` }}
          />
        </div>
      </div>

      <Flashcard
        card={dueCards[idx]}
        flipped={flipped}
        onFlip={() => setFlipped(!flipped)}
        mode={mode}
        speechRate={speechRate}
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
