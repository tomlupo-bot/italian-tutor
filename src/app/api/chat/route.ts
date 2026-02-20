import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Lazy init to avoid build-time crash when env var is missing
let _openai: OpenAI | null = null;
function getOpenAI() {
  if (!_openai) {
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });
  }
  return _openai;
}

const TOPIC_PROMPTS: Record<string, { name: string; question: string }> = {
  sport: { name: "Sport e fuoriclasse", question: "Chi è il tuo sportivo preferito e perché lo consideri un fuoriclasse?" },
  routine: { name: "La vita quotidiana", question: "Raccontami della tua giornata tipica. Cosa fai dalla mattina alla sera?" },
  food: { name: "Cibo e ristoranti", question: "Qual è il tuo piatto preferito? Ti piace cucinare o preferisci andare al ristorante?" },
  travel: { name: "Viaggi e vacanze", question: "Qual è il viaggio più bello che hai fatto? Dove vorresti andare?" },
  work: { name: "Lavoro e carriera", question: "Cosa fai per lavoro? Come ti trovi? Cosa ti piace del tuo lavoro?" },
  tech: { name: "Tecnologia e futuro", question: "Come pensi che la tecnologia cambierà la nostra vita nei prossimi anni?" },
  health: { name: "Salute e benessere", question: "Cosa fai per mantenerti in forma? Quanto è importante la salute per te?" },
  culture: { name: "Cultura italiana", question: "Cosa ti affascina della cultura italiana? Hai un film o libro italiano preferito?" },
};

function buildSystemPrompt(topicId: string): string {
  const topic = TOPIC_PROMPTS[topicId] || TOPIC_PROMPTS.sport;
  return `You are Marco, an Italian language tutor from Rome. You're patient but direct, with a good sense of humor. You speak Italian by default and switch to English only when the student is stuck. You ask one question at a time, wait for the response, give a brief correction if needed, then ask the next question. Keep corrections short and encouraging. The student is at A2-B1 level.

Current topic: "${topic.name}"
Start with this question: "${topic.question}"

Rules:
- Speak Italian 80-90% of the time
- Ask ONE question, then wait
- If the student makes an error, give a SHORT correction (1-2 sentences max), then move on
- Be encouraging but honest
- Use vocab from the current topic naturally
- After 6-8 exchanges, wrap up with "Ottimo lavoro! Basta per oggi."
- When wrapping up, include a JSON block at the end with this exact format:
\`\`\`json
{"done": true, "errors": [{"original": "...", "corrected": "...", "explanation": "..."}], "newPhrases": ["phrase1", "phrase2"], "grammarTip": "One grammar tip relevant to today's conversation"}
\`\`\``;
}

export async function POST(req: NextRequest) {
  try {
    const { messages, topic } = await req.json();
    const topicId = topic || "sport";

    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: buildSystemPrompt(topicId) }, ...messages],
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = completion.choices[0]?.message?.content || "";
    return NextResponse.json({ content });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
