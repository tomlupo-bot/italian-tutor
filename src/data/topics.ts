export interface Topic {
  id: string;
  name: string;
  question: string;
  tagFilter?: string;
}

export const topics: Topic[] = [
  {
    id: "sport",
    name: "Sport e fuoriclasse",
    question: "Chi è il tuo sportivo preferito e perché lo consideri un fuoriclasse?",
    tagFilter: "sport",
  },
  {
    id: "routine",
    name: "La vita quotidiana",
    question: "Raccontami della tua giornata tipica. Cosa fai dalla mattina alla sera?",
    tagFilter: "routine",
  },
  {
    id: "food",
    name: "Cibo e ristoranti",
    question: "Qual è il tuo piatto preferito? Ti piace cucinare o preferisci andare al ristorante?",
    tagFilter: "food",
  },
  {
    id: "travel",
    name: "Viaggi e vacanze",
    question: "Qual è il viaggio più bello che hai fatto? Dove vorresti andare?",
    tagFilter: "travel",
  },
  {
    id: "work",
    name: "Lavoro e carriera",
    question: "Cosa fai per lavoro? Come ti trovi? Cosa ti piace del tuo lavoro?",
    tagFilter: "work",
  },
  {
    id: "tech",
    name: "Tecnologia e futuro",
    question: "Come pensi che la tecnologia cambierà la nostra vita nei prossimi anni?",
    tagFilter: "tech",
  },
  {
    id: "health",
    name: "Salute e benessere",
    question: "Cosa fai per mantenerti in forma? Quanto è importante la salute per te?",
    tagFilter: "fitness",
  },
  {
    id: "culture",
    name: "Cultura italiana",
    question: "Cosa ti affascina della cultura italiana? Hai un film o libro italiano preferito?",
    tagFilter: "idioms",
  },
];

const LAST_TOPIC_KEY = "italian-tutor-last-topic";
const LAST_FEEDBACK_KEY = "italian-tutor-last-feedback";

export function getLastFeedback(): { topic: string; feedback: string } | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(LAST_FEEDBACK_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function saveLastFeedback(topic: string, feedback: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LAST_FEEDBACK_KEY, JSON.stringify({ topic, feedback }));
}

export function pickTopic(): Topic {
  if (typeof window === "undefined") return topics[0];
  const lastId = localStorage.getItem(LAST_TOPIC_KEY);
  const lastFeedback = getLastFeedback();

  // If last session was "hard", repeat same topic
  if (lastFeedback?.feedback === "hard") {
    const same = topics.find((t) => t.id === lastFeedback.topic);
    if (same) return same;
  }

  // Otherwise pick a different topic
  const available = lastId ? topics.filter((t) => t.id !== lastId) : topics;
  const pick = available[Math.floor(Math.random() * available.length)];
  return pick;
}

export function saveLastTopic(topicId: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LAST_TOPIC_KEY, topicId);
}
