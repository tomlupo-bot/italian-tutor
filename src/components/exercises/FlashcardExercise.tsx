"use client";

import { useCallback, useRef } from "react";
import type { ExerciseResult, SrsContent, SrsResult } from "@/lib/exerciseTypes";
import SrsCard from "@/components/SrsCard";

interface Props {
  content: unknown;
  onComplete: (result: ExerciseResult) => void;
}

export default function FlashcardExercise({ content, onComplete }: Props) {
  const c = content as SrsContent & { mode?: "classic" | "reverse" | "listening"; level?: string; tag?: string };
  const startTime = useRef(Date.now());

  const handleRate = useCallback(
    (quality: number) => {
      const result: SrsResult = {
        quality,
        time_ms: Date.now() - startTime.current,
      };
      onComplete(result);
    },
    [onComplete],
  );

  return (
    <SrsCard
      card={{
        front: c.front,
        back: c.back,
        level: c.level,
        tag: c.tag,
      }}
      mode={c.mode ?? "classic"}
      onRate={handleRate}
    />
  );
}
