# Italian Tutor — Marco 🇮🇹

AI-powered Italian language learning app with SRS spaced repetition.

## Setup

```bash
cp .env.local.example .env.local
# Edit .env.local with your OpenAI API key

npm install
npm run build
npm run start
```

Open http://localhost:3000

## Session Flow

1. **Warmup** — Flip through 8 vocab flashcards (swipe or click arrows)
2. **Conversation** — Chat with Marco (GPT-4o-mini) in Italian
3. **Review** — See corrections, new phrases, grammar tip
4. **Feedback** — Rate difficulty (Easy/Good/Hard)
5. **SRS Update** — Cards scheduled using SM-2 algorithm

## Tech Stack

- Next.js 14 (App Router)
- Tailwind CSS (dark mode)
- OpenAI GPT-4o-mini
- SM-2 spaced repetition
- localStorage for card state
