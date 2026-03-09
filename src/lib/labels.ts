const SKILL_LABELS: Record<string, string> = {
  vocab_core: "Core Vocabulary",
  grammar_forms: "Grammar Forms",
  grammar_syntax: "Sentence Patterns",
  listening_literal: "Listening",
  listening_inference: "Listening Inference",
  speaking_accuracy: "Speaking Accuracy",
  speaking_fluency: "Speaking Fluency",
  pronunciation: "Pronunciation",
  reading_comprehension: "Reading",
  writing_micro: "Writing",
  pragmatics: "Conversation Moves",
  task_completion: "Task Completion",
};

export function prettySkillLabel(skillKey?: string | null): string | null {
  if (!skillKey) return null;
  return SKILL_LABELS[skillKey] ?? skillKey.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
