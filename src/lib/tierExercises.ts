/**
 * Generate tier-specific exercises from unit data.
 * Each tier gets UNIQUE exercises — no repetition across tiers.
 */

import type { Tier } from "./tiers";

interface UnitVocab {
  it: string;
  en: string;
  example: string;
}

interface UnitExercise {
  type: string;
  sentence: string;
  answer: string;
}

interface UnitData {
  unit: number;
  level: string;
  theme: string;
  theme_en: string;
  grammar_point: string;
  vocab: UnitVocab[];
  exercises: UnitExercise[];
  scenario: { title: string; setup: string; opening: string; goal: string };
}

export interface TierExercise {
  id: string;
  type: "fill" | "translate" | "match" | "listen" | "reorder";
  prompt: string;
  answer: string;
  options?: string[];
  hint?: string;
}

// Shuffle deterministically by seed
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 16807 + 0) % 2147483647;
    const j = s % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function generateTierExercises(unit: UnitData, tier: Tier): TierExercise[] {
  const vocab = unit.vocab;
  const seed = unit.unit * 1000;

  switch (tier) {
    case "bronze": {
      // Fill-in-the-blank from unit exercises + basic IT→EN translation
      const exercises: TierExercise[] = [];
      
      // Use the built-in fill exercises
      for (const ex of unit.exercises) {
        exercises.push({
          id: `bronze-fill-${exercises.length}`,
          type: "fill",
          prompt: ex.sentence,
          answer: ex.answer,
          hint: `(${ex.type})`,
        });
      }

      // Add IT→EN translation for first 3 vocab words
      const bronzeVocab = vocab.slice(0, 3);
      for (const v of bronzeVocab) {
        exercises.push({
          id: `bronze-translate-${exercises.length}`,
          type: "translate",
          prompt: `Translate: "${v.it}"`,
          answer: v.en,
        });
      }

      return exercises;
    }

    case "silver": {
      // EN→IT translation + reorder sentences (different vocab than bronze)
      const exercises: TierExercise[] = [];
      
      // EN→IT translation for vocab words 3-7 (different from bronze)
      const silverVocab = vocab.slice(3, 7);
      for (const v of silverVocab) {
        exercises.push({
          id: `silver-translate-${exercises.length}`,
          type: "translate",
          prompt: `Come si dice: "${v.en}"?`,
          answer: v.it,
          hint: v.example,
        });
      }

      // Reorder: scramble example sentences
      const reorderVocab = seededShuffle(vocab, seed + 200).slice(0, 3);
      for (const v of reorderVocab) {
        const words = v.example.replace(/[.!?]/g, "").split(" ");
        if (words.length >= 3) {
          exercises.push({
            id: `silver-reorder-${exercises.length}`,
            type: "reorder",
            prompt: `Put in order: ${seededShuffle(words, seed + exercises.length).join(" / ")}`,
            answer: v.example.replace(/[.!?]/g, "").trim(),
            hint: v.en,
          });
        }
      }

      return exercises;
    }

    case "gold": {
      // Hard exercises: listen-type (write what you hear), full sentence translation, context fill
      const exercises: TierExercise[] = [];

      // Full sentence EN→IT translation from examples
      const goldVocab = vocab.slice(7);
      for (const v of goldVocab) {
        exercises.push({
          id: `gold-translate-${exercises.length}`,
          type: "translate",
          prompt: `Traduci: "${v.example.replace(/[.!?]/g, "")}" → English`,
          answer: v.en,
          hint: `Key word: ${v.it}`,
        });
      }

      // Context-based fill using grammar point
      const contextVocab = seededShuffle(vocab, seed + 300).slice(0, 2);
      for (const v of contextVocab) {
        const blank = v.example.replace(v.it, "_____");
        if (blank !== v.example) {
          exercises.push({
            id: `gold-context-${exercises.length}`,
            type: "fill",
            prompt: blank,
            answer: v.it,
            hint: v.en,
          });
        }
      }

      return exercises;
    }
  }
}
