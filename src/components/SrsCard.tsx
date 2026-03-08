"use client";

import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Volume2 } from "lucide-react";
import { playItalianTts } from "@/lib/audioTts";

export type SrsCardMode = "classic" | "reverse" | "listening";

export interface SrsCardData {
  front: string; // Italian text
  back: string; // English text
  example?: string; // Example sentence
  tag?: string;
  level?: string;
}

const QUALITY_BUTTONS = [
  { quality: 0, label: "Again", color: "bg-danger/20 text-danger border-danger/30" },
  { quality: 2, label: "Hard", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  { quality: 3, label: "Good", color: "bg-accent/20 text-accent-light border-accent/30" },
  { quality: 5, label: "Easy", color: "bg-success/20 text-success border-success/30" },
];

const LEVEL_COLORS: Record<string, string> = {
  A1: "bg-success/20 text-success",
  A2: "bg-accent/20 text-accent-light",
  B1: "bg-warn/20 text-warn",
  B2: "bg-danger/20 text-danger",
};

interface Props {
  card: SrsCardData;
  mode?: SrsCardMode;
  onRate: (quality: number) => void;
  speechRate?: number;
}

export default function SrsCard({ card, mode = "classic", onRate, speechRate = 0.85 }: Props) {
  const [flipped, setFlipped] = useState(false);
  const startTime = useRef(Date.now());

  const handleRate = useCallback(
    (quality: number) => {
      setFlipped(false);
      onRate(quality);
    },
    [onRate],
  );

  const speak = useCallback(
    (text: string, e?: React.MouseEvent) => {
      e?.stopPropagation();
      void playItalianTts(text, { rate: speechRate, userInitiated: true });
    },
    [speechRate],
  );

  const levelBadge = card.level ? (
    <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-medium", LEVEL_COLORS[card.level] || "bg-white/5 text-white/30")}>
      {card.level}
    </span>
  ) : null;

  // Front content based on mode
  const renderFront = () => {
    if (mode === "listening") {
      return (
        <>
          <button
            onClick={(e) => speak(card.front, e)}
            className="p-5 rounded-full bg-accent/20 hover:bg-accent/30 text-accent-light transition mb-3"
          >
            <Volume2 size={28} />
          </button>
          <p className="text-white/40 text-sm">Listen and guess</p>
        </>
      );
    }
    if (mode === "reverse") {
      return (
        <>
          <p className="text-2xl font-semibold text-center text-accent-light">{card.back}</p>
          <p className="text-white/30 text-sm mt-4">What&apos;s this in Italian?</p>
        </>
      );
    }
    // Classic
    return (
      <>
        <p className="text-2xl font-semibold text-center">{card.front}</p>
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={(e) => speak(card.front, e)}
            className="p-2 rounded-full bg-accent/20 hover:bg-accent/30 text-accent-light transition"
          >
            <Volume2 size={16} />
          </button>
          <p className="text-white/30 text-sm">Tap to reveal</p>
        </div>
      </>
    );
  };

  // Back content (same for all modes)
  const renderBack = () => (
    <>
      {mode === "classic" && <p className="text-sm text-white/40 mb-1">{card.front}</p>}
      {mode === "reverse" && <p className="text-sm text-white/40 mb-1">{card.back}</p>}
      <p className="text-xl font-medium text-accent-light text-center">
        {mode === "reverse" ? card.front : card.back}
      </p>
      {card.example && (
        <div className="flex items-center gap-2 mt-3">
          <p className="text-white/50 text-sm italic text-center">&ldquo;{card.example}&rdquo;</p>
          <button
            onClick={(e) => speak(card.example!, e)}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/40 transition flex-shrink-0"
          >
            <Volume2 size={12} />
          </button>
        </div>
      )}
      <button
        onClick={(e) => speak(card.front, e)}
        className="mt-3 p-2 rounded-full bg-accent/20 hover:bg-accent/30 text-accent-light transition"
      >
        <Volume2 size={16} />
      </button>
    </>
  );

  return (
    <div className="space-y-4 w-full max-w-sm mx-auto">
      {/* Badges */}
      <div className="flex items-center justify-center gap-2">
        {card.tag && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/30">{card.tag}</span>
        )}
        {levelBadge}
      </div>

      {/* Card with 3D flip */}
      <div
        className="perspective-1000 w-full h-52 cursor-pointer"
        onClick={() => !flipped && setFlipped(true)}
      >
        <div className={cn(
          "relative w-full h-full transition-transform duration-500 preserve-3d",
          flipped && "rotate-y-180",
        )}>
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-card rounded-2xl border border-white/10 flex flex-col items-center justify-center p-6">
            {renderFront()}
          </div>
          {/* Back */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-card rounded-2xl border border-accent/30 flex flex-col items-center justify-center p-6">
            {renderBack()}
          </div>
        </div>
      </div>

      {/* Rating buttons — after flip */}
      {flipped && (
        <div className="grid grid-cols-4 gap-2">
          {QUALITY_BUTTONS.map((btn) => (
            <button
              key={btn.quality}
              onClick={() => handleRate(btn.quality)}
              className={cn(
                "py-3 rounded-xl text-sm font-medium border transition active:scale-95",
                btn.color,
              )}
            >
              {btn.label}
            </button>
          ))}
        </div>
      )}

      {!flipped && (
        <p className="text-center text-white/20 text-xs">Tap card to flip</p>
      )}
    </div>
  );
}
