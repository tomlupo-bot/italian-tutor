export interface ErrorInsight {
  label: string;
  takeaway: string;
}

const ERROR_INSIGHT_META: Record<string, ErrorInsight> = {
  article_gender_number: {
    label: "Articles and agreement",
    takeaway: "Article, gender, or plural agreement is slipping recently.",
  },
  agreement: {
    label: "Agreement",
    takeaway: "Matching words correctly is a frequent recent issue.",
  },
  cloze: {
    label: "Verb endings",
    takeaway: "Filling in the correct verb form is the main recent issue.",
  },
  conversation: {
    label: "Complete responses",
    takeaway: "Your answers are often missing part of what the task asks for.",
  },
  error_recognition: {
    label: "Grammar accuracy",
    takeaway: "Spotting and fixing grammar mistakes needs more attention.",
  },
  false_friend: {
    label: "False friends",
    takeaway: "Similar-looking words across languages are causing confusion.",
  },
  functional: {
    label: "Useful phrases",
    takeaway: "Practical phrasing is still unstable in recent sessions.",
  },
  grammar: {
    label: "Grammar",
    takeaway: "Grammar accuracy is the main recent weak spot.",
  },
  grammar_pattern: {
    label: "Verb tense",
    takeaway: "Choosing the right tense is the biggest recent problem.",
  },
  incomplete_response: {
    label: "Complete responses",
    takeaway: "You are often addressing only part of the task.",
  },
  instruction_misread: {
    label: "Instructions",
    takeaway: "The task prompt itself is being missed or only partly followed.",
  },
  lexical_choice: {
    label: "Word choice",
    takeaway: "Choosing the right word is the main recent weak spot.",
  },
  lexical_gap: {
    label: "Missing words",
    takeaway: "You are often missing the key word or phrase you need.",
  },
  listening_mishear: {
    label: "Listening detail",
    takeaway: "Small listening details are being misheard.",
  },
  negation_reversal: {
    label: "Negation",
    takeaway: "Negation is changing the meaning more often than it should.",
  },
  off_topic: {
    label: "Staying on topic",
    takeaway: "Responses are drifting away from the goal of the task.",
  },
  pragmatic_mismatch: {
    label: "Tone and register",
    takeaway: "The tone or social register is not matching the situation.",
  },
  preposition: {
    label: "Prepositions",
    takeaway: "Prepositions are the most common recent problem.",
  },
  pronunciation_prosody: {
    label: "Stress and rhythm",
    takeaway: "Stress or intonation patterns need more work.",
  },
  pronunciation_segmental: {
    label: "Pronunciation sounds",
    takeaway: "Specific Italian sounds are causing trouble.",
  },
  spelling: {
    label: "Spelling",
    takeaway: "Spelling accuracy is slipping in recent practice.",
  },
  srs_review: {
    label: "Word recall",
    takeaway: "Remembering reviewed words is the main recent issue.",
  },
  translation: {
    label: "Word choice",
    takeaway: "Finding the right translation quickly is causing mistakes.",
  },
  unknown: {
    label: "General accuracy",
    takeaway: "A broad accuracy issue is showing up in recent practice.",
  },
  verb_conjugation: {
    label: "Verb endings",
    takeaway: "Verb conjugation is the main recent weak spot.",
  },
  verb_tense: {
    label: "Verb tense",
    takeaway: "Tense choice is the biggest recent problem.",
  },
  vocab: {
    label: "Vocabulary",
    takeaway: "Vocabulary recall is the main recent weak spot.",
  },
  word_order: {
    label: "Word order",
    takeaway: "Sentence order is getting in the way of accuracy.",
  },
};

export function getErrorInsight(category?: string | null): ErrorInsight {
  if (!category) {
    return {
      label: "General accuracy",
      takeaway: "A broad accuracy issue is showing up in recent practice.",
    };
  }

  return (
    ERROR_INSIGHT_META[category] ?? {
      label: category.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()),
      takeaway: "This issue is showing up frequently in recent practice.",
    }
  );
}
