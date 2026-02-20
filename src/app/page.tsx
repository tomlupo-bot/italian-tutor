"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { vocab, type VocabCard } from "../data/vocab";
import { topics, pickTopic, saveLastTopic, saveLastFeedback, getLastFeedback, type Topic } from "../data/topics";
import { loadSRS, saveSRS, getOrCreateCard, sm2, getDueCards, type SRSCard, type Quality } from "../lib/srs";
import { loadUserVocab, addUserVocabCards, saveSession, getStreak, loadSessions, loadSettings, saveSettings, getTodayReviewed } from "../lib/storage";
import { cn } from "../lib/cn";
import Flashcard, { speakItalian as speakCard } from "../components/Flashcard";
import { RotateCcw, ChevronLeft, ChevronRight, Send, BookOpen, MessageCircle, ClipboardCheck, Star, Zap, Volume2, VolumeX, Mic } from "lucide-react";

type Phase = "warmup" | "conversation" | "review" | "feedback" | "done";

interface ChatMessage {
  role: "assistant" | "user";
  content: string;
}

interface ReviewData {
  errors: { original: string; corrected: string; explanation: string }[];
  newPhrases: string[];
  grammarTip: string;
}

// ─── Merge built-in + user vocab ─────────────────────
function getAllVocab(): VocabCard[] {
  const userVocab = loadUserVocab();
  return [...vocab, ...userVocab];
}

// ─── Pick session cards ──────────────────────────────
function pickSessionCards(topic: Topic): VocabCard[] {
  if (typeof window === "undefined") return vocab.slice(0, 12);
  const allVocab = getAllVocab();
  const srs = loadSRS();
  const allIds = allVocab.map((v) => v.id);
  const dueIds = getDueCards(srs, allIds);

  // Prefer cards matching topic tag
  const topicCards = dueIds.filter((id) => {
    const card = allVocab.find((v) => v.id === id);
    return card?.tag === topic.tagFilter;
  });
  const otherCards = dueIds.filter((id) => !topicCards.includes(id));

  const shuffledTopic = [...topicCards].sort(() => Math.random() - 0.5);
  const shuffledOther = [...otherCards].sort(() => Math.random() - 0.5);
  let selected = [...shuffledTopic, ...shuffledOther].slice(0, 12);

  if (selected.length < 12) {
    const remaining = allVocab
      .filter((v) => !selected.includes(v.id))
      .sort(() => Math.random() - 0.5);
    for (const v of remaining) {
      if (selected.length >= 12) break;
      selected.push(v.id);
    }
  }
  return selected.map((id) => allVocab.find((v) => v.id === id)!).filter(Boolean);
}

// ─── TTS helper ──────────────────────────────────────
function speakItalian(text: string, muted: boolean) {
  if (muted || typeof window === "undefined" || !window.speechSynthesis) return;
  const clean = text.replace(/```json[\s\S]*?```/, "").trim();
  if (!clean) return;
  const utterance = new SpeechSynthesisUtterance(clean);
  utterance.lang = "it-IT";
  const voices = speechSynthesis.getVoices();
  const itVoice = voices.find((v) => v.lang.startsWith("it"));
  if (itVoice) utterance.voice = itVoice;
  utterance.rate = 0.9;
  speechSynthesis.speak(utterance);
}

// ─── Progress Bar ────────────────────────────────────
function ProgressBar({ phase }: { phase: Phase }) {
  const phases: Phase[] = ["warmup", "conversation", "review", "feedback", "done"];
  const icons = [BookOpen, MessageCircle, ClipboardCheck, Star, Zap];
  const labels = ["Warmup", "Talk", "Review", "Rate", "Done"];
  const idx = phases.indexOf(phase);

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-card/50 backdrop-blur border-b border-white/5">
      {phases.map((p, i) => {
        const Icon = icons[i];
        const active = i === idx;
        const done = i < idx;
        return (
          <div key={p} className="flex flex-col items-center gap-1">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all",
              active && "bg-accent text-white scale-110",
              done && "bg-accent/30 text-accent-light",
              !active && !done && "bg-white/5 text-white/30"
            )}>
              <Icon size={16} />
            </div>
            <span className={cn("text-[10px]", active ? "text-white" : "text-white/30")}>{labels[i]}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Warmup Phase (per-card feedback) ────────────────
function WarmupPhase({
  cards,
  onDone,
}: {
  cards: VocabCard[];
  onDone: (results: { id: string; knew: boolean }[]) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState<{ id: string; knew: boolean }[]>([]);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Auto-speak Italian word when card changes
  useEffect(() => {
    if (cards[idx]) speakCard(cards[idx].it);
  }, [idx, cards]);

  const handleFeedback = (knew: boolean) => {
    const newResults = [...results, { id: cards[idx].id, knew }];
    setResults(newResults);
    setFlipped(false);
    if (idx < cards.length - 1) {
      setIdx(idx + 1);
    } else {
      onDone(newResults);
    }
  };

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center px-4 gap-6"
      onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStart === null || flipped) return;
        const diff = e.changedTouches[0].clientX - touchStart;
        if (Math.abs(diff) > 50) {
          if (diff > 0 && idx > 0) {
            setFlipped(false);
            setIdx(idx - 1);
          }
        }
        setTouchStart(null);
      }}
    >
      <div className="text-center">
        <h2 className="text-lg font-semibold text-accent-light">🔥 Riscaldamento</h2>
        <p className="text-white/40 text-sm">Card {idx + 1} di {cards.length}</p>
        {/* Progress bar */}
        <div className="w-48 h-1.5 bg-white/5 rounded-full mt-2 mx-auto">
          <div
            className="h-full bg-accent rounded-full transition-all"
            style={{ width: `${((results.length) / cards.length) * 100}%` }}
          />
        </div>
      </div>
      <Flashcard card={cards[idx]} flipped={flipped} onFlip={() => setFlipped(!flipped)} />
      {flipped ? (
        <div className="flex gap-4">
          <button
            onClick={() => handleFeedback(false)}
            className="px-6 py-3 rounded-xl bg-danger/20 border border-danger/30 hover:bg-danger/30 transition font-medium text-sm"
          >
            Didn&apos;t know ✗
          </button>
          <button
            onClick={() => handleFeedback(true)}
            className="px-6 py-3 rounded-xl bg-success/20 border border-success/30 hover:bg-success/30 transition font-medium text-sm"
          >
            Knew it ✓
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <button
            onClick={() => setFlipped(true)}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      )}
      <p className="text-white/20 text-xs">Tap card to flip • Then rate your knowledge</p>
    </div>
  );
}

// ─── Conversation Phase ──────────────────────────────
function ConversationPhase({
  topic,
  muted,
  onDone,
}: {
  topic: Topic;
  muted: boolean;
  onDone: (review: ReviewData, duration: number) => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // STT support check
  const sttSupported = typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const sendMessage = useCallback(
    async (userMsg?: string) => {
      const newMessages = userMsg
        ? [...messages, { role: "user" as const, content: userMsg }]
        : messages;

      if (userMsg) setMessages(newMessages);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newMessages, topic: topic.id }),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        const content = data.content as string;
        setMessages((prev) => [...prev, { role: "assistant", content }]);

        // TTS
        speakItalian(content, muted);

        const jsonMatch = content.match(/```json\s*([\s\S]*?)```/);
        if (jsonMatch) {
          try {
            const review = JSON.parse(jsonMatch[1]);
            if (review.done) {
              const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
              setTimeout(() => onDone(review, duration), 2000);
            }
          } catch {
            /* ignore */
          }
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Mi dispiace, c'è un problema tecnico. Riproviamo!" },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages, onDone, topic.id, muted]
  );

  const startConversation = () => {
    setStarted(true);
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    sendMessage();
  };

  const startRecording = () => {
    if (!sttSupported) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const recognition = new SR();
    recognition.lang = "it-IT";
    recognition.interimResults = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript.trim()) {
        sendMessage(transcript.trim());
      }
      setIsRecording(false);
    };
    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);
    recognition.start();
    recognitionRef.current = recognition;
    setIsRecording(true);
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  };

  if (!started) {
    const lastFeedback = getLastFeedback();
    const adaptiveMsg = lastFeedback
      ? lastFeedback.feedback === "hard"
        ? `La scorsa sessione su "${topics.find((t) => t.id === lastFeedback.topic)?.name}" era difficile — riproviamo!`
        : `Oggi cambiamo argomento: ${topic.name}!`
      : null;

    return (
      <div className="flex-1 flex flex-col items-center justify-center px-4 gap-6">
        <div className="text-center space-y-2">
          <h2 className="text-lg font-semibold text-accent-light">💬 Conversazione con Marco</h2>
          <p className="text-white/50 text-sm max-w-xs">
            Marco ti farà delle domande. Rispondi in italiano — non preoccuparti degli errori!
          </p>
          {adaptiveMsg && <p className="text-accent-light/70 text-xs italic">{adaptiveMsg}</p>}
        </div>
        <div className="bg-card rounded-xl border border-white/10 p-4 max-w-sm">
          <p className="text-white/70 text-sm italic">&ldquo;{topic.question}&rdquo;</p>
        </div>
        <button
          onClick={startConversation}
          className="px-6 py-3 bg-accent rounded-xl font-medium hover:bg-accent/80 transition"
        >
          Iniziamo! 🇮🇹
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Timer header */}
      <div className="px-4 py-1.5 flex items-center justify-between text-xs text-white/30 border-b border-white/5">
        <span>{topic.name}</span>
        <span className={cn(elapsed >= 480 && "text-warn", elapsed >= 600 && "text-danger")}>
          ⏱ {formatTime(elapsed)}
          {elapsed >= 480 && elapsed < 600 && " — Quasi finito!"}
          {elapsed >= 600 && " — Tempo di concludere!"}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
              msg.role === "assistant"
                ? "bg-card border border-white/10 self-start"
                : "bg-accent/20 border border-accent/20 self-end ml-auto"
            )}
          >
            {msg.role === "assistant" && (
              <div className="flex items-center justify-between mb-1">
                <span className="text-accent-light text-xs font-medium">Marco 🇮🇹</span>
                <button
                  onClick={() => speakItalian(msg.content, false)}
                  className="text-white/30 hover:text-accent-light transition p-0.5"
                  title="Replay"
                >
                  <Volume2 size={14} />
                </button>
              </div>
            )}
            <p className="whitespace-pre-wrap">
              {msg.content.replace(/```json[\s\S]*?```/, "").trim()}
            </p>
          </div>
        ))}
        {loading && (
          <div className="bg-card border border-white/10 rounded-2xl px-4 py-3 self-start max-w-[85%]">
            <span className="text-accent-light text-xs font-medium block mb-1">Marco 🇮🇹</span>
            <div className="flex gap-1">
              <span className="animate-bounce">·</span>
              <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>·</span>
              <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>·</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim() && !loading) sendMessage(input.trim());
        }}
        className="px-4 py-3 border-t border-white/5 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Scrivi in italiano..."
          className="flex-1 bg-card border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent/50 transition"
          autoFocus
        />
        {sttSupported && (
          <button
            type="button"
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onTouchStart={startRecording}
            onTouchEnd={stopRecording}
            className={cn(
              "p-3 rounded-xl transition",
              isRecording ? "bg-danger animate-pulse" : "bg-white/5 hover:bg-white/10"
            )}
          >
            <Mic size={18} />
          </button>
        )}
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-3 bg-accent rounded-xl disabled:opacity-30 hover:bg-accent/80 transition"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}

// ─── Review Phase ────────────────────────────────────
function ReviewPhase({ review, onDone }: { review: ReviewData; onDone: () => void }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      <h2 className="text-lg font-semibold text-accent-light text-center">📋 Riepilogo della sessione</h2>

      {review.errors.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-warn">⚠️ Correzioni ({review.errors.length})</h3>
          {review.errors.map((e, i) => (
            <div key={i} className="bg-card rounded-xl border border-white/10 p-3 space-y-1">
              <p className="text-sm">
                <span className="text-danger line-through">{e.original}</span>
              </p>
              <p className="text-sm">
                <span className="text-success">→ {e.corrected}</span>
              </p>
              <p className="text-xs text-white/40">{e.explanation}</p>
            </div>
          ))}
        </div>
      )}

      {review.errors.length === 0 && (
        <div className="bg-card rounded-xl border border-success/20 p-4 text-center">
          <p className="text-success">Perfetto! Nessun errore oggi 🎉</p>
        </div>
      )}

      {review.newPhrases.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-accent-light">📝 Frasi nuove</h3>
          <div className="bg-card rounded-xl border border-white/10 p-3">
            {review.newPhrases.map((p, i) => (
              <p key={i} className="text-sm text-white/70 py-1">• {p}</p>
            ))}
          </div>
        </div>
      )}

      {review.grammarTip && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-accent-light">💡 Grammar Tip</h3>
          <div className="bg-card rounded-xl border border-accent/20 p-3">
            <p className="text-sm text-white/70">{review.grammarTip}</p>
          </div>
        </div>
      )}

      <button
        onClick={onDone}
        className="w-full py-3 bg-accent rounded-xl font-medium hover:bg-accent/80 transition"
      >
        Continua →
      </button>
    </div>
  );
}

// ─── Feedback Phase (conversation only) ──────────────
function FeedbackPhase({ onFeedback }: { onFeedback: (f: "easy" | "good" | "hard") => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 gap-8">
      <div className="text-center space-y-2">
        <h2 className="text-lg font-semibold text-accent-light">Com&apos;è andata la conversazione?</h2>
        <p className="text-white/40 text-sm">Questo influenzerà il prossimo argomento</p>
      </div>
      <div className="flex gap-4">
        {[
          { key: "hard" as const, label: "Difficile", emoji: "😓", color: "bg-danger/20 border-danger/30 hover:bg-danger/30" },
          { key: "good" as const, label: "Bene", emoji: "👍", color: "bg-warn/20 border-warn/30 hover:bg-warn/30" },
          { key: "easy" as const, label: "Facile", emoji: "🔥", color: "bg-success/20 border-success/30 hover:bg-success/30" },
        ].map((opt) => (
          <button
            key={opt.key}
            onClick={() => onFeedback(opt.key)}
            className={cn("flex flex-col items-center gap-2 px-6 py-4 rounded-2xl border transition", opt.color)}
          >
            <span className="text-2xl">{opt.emoji}</span>
            <span className="text-sm font-medium">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Done Phase ──────────────────────────────────────
function DonePhase({ onRestart }: { onRestart: () => void }) {
  const sessions = loadSessions();
  const streak = getStreak();

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 gap-6">
      <div className="text-6xl">🏆</div>
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold">Sessione completata!</h2>
        <p className="text-white/50 text-sm">Bravo! Ci vediamo alla prossima.</p>
      </div>
      <div className="flex gap-6 text-center">
        <div>
          <p className="text-2xl font-bold text-accent-light">{sessions.length}</p>
          <p className="text-xs text-white/40">Sessions</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-success">{streak}</p>
          <p className="text-xs text-white/40">Day streak</p>
        </div>
      </div>
      <button
        onClick={onRestart}
        className="px-6 py-3 bg-accent rounded-xl font-medium hover:bg-accent/80 transition"
      >
        Nuova sessione
      </button>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────
export default function Home() {
  const [phase, setPhase] = useState<Phase>("warmup");
  const [reviewData, setReviewData] = useState<ReviewData>({ errors: [], newPhrases: [], grammarTip: "" });
  const [sessionCards, setSessionCards] = useState<VocabCard[]>([]);
  const [mounted, setMounted] = useState(false);
  const [topic, setTopic] = useState<Topic>(topics[0]);
  const [muted, setMuted] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(0);

  useEffect(() => {
    const t = pickTopic();
    setTopic(t);
    setSessionCards(pickSessionCards(t));
    setMuted(loadSettings().muted);
    setMounted(true);
  }, []);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    saveSettings({ muted: next });
    if (next) speechSynthesis?.cancel();
  };

  const handleWarmupDone = (results: { id: string; knew: boolean }[]) => {
    // Apply per-card SRS
    const srs = loadSRS();
    for (const r of results) {
      const current = getOrCreateCard(srs, r.id);
      const quality: Quality = r.knew ? 4 : 1;
      srs[r.id] = sm2(current, quality);
    }
    saveSRS(srs);
    setPhase("conversation");
  };

  const handleConversationDone = (review: ReviewData, duration: number) => {
    setReviewData(review);
    setSessionDuration(duration);

    // Create cards from errors
    if (review.errors.length > 0) {
      const errorCards: VocabCard[] = review.errors.map((e, i) => ({
        id: `err-${Date.now()}-${i}`,
        it: e.corrected,
        en: e.explanation,
        ex: e.original,
        tag: "mistakes",
      }));
      addUserVocabCards(errorCards);
    }

    // Create cards from new phrases
    if (review.newPhrases.length > 0) {
      const phraseCards: VocabCard[] = review.newPhrases.map((p, i) => ({
        id: `phrase-${Date.now()}-${i}`,
        it: p,
        en: p,
        ex: `Learned from Marco during conversation`,
        tag: "learned",
      }));
      addUserVocabCards(phraseCards);
    }

    setPhase("review");
  };

  const handleFeedback = (feedback: "easy" | "good" | "hard") => {
    saveLastFeedback(topic.id, feedback);
    saveLastTopic(topic.id);

    // Save session
    saveSession({
      date: new Date().toISOString().split("T")[0],
      topic: topic.name,
      cardsReviewed: sessionCards.length,
      errorsCount: reviewData.errors.length,
      newPhrasesCount: reviewData.newPhrases.length,
      feedback,
      duration: sessionDuration,
    });

    setPhase("done");
  };

  const handleRestart = () => {
    const t = pickTopic();
    setTopic(t);
    setSessionCards(pickSessionCards(t));
    setReviewData({ errors: [], newPhrases: [], grammarTip: "" });
    setPhase("warmup");
  };

  if (!mounted || sessionCards.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center max-w-lg mx-auto pb-16">
        <div className="text-center space-y-4">
          <div className="text-4xl">🇮🇹</div>
          <h1 className="text-xl font-semibold">Italian Tutor</h1>
          <p className="text-white/40 text-sm">Preparing your session...</p>
        </div>
      </main>
    );
  }

  const todayReviewed = mounted ? getTodayReviewed() : 0;
  const settings = mounted ? loadSettings() : { dailyGoal: 20, muted: false, autoSpeak: true, speechRate: 0.85, preferredMode: "classic" as const };
  const goalProgress = Math.min(todayReviewed / settings.dailyGoal, 1);
  const streak = mounted ? getStreak() : 0;

  return (
    <main className="min-h-screen flex flex-col max-w-lg mx-auto pb-16">
      {/* Daily Goal Banner */}
      <div className="px-4 pt-3 pb-1">
        <div className="bg-card rounded-xl border border-white/10 p-3 flex items-center gap-3">
          <div className="relative w-10 h-10 flex-shrink-0">
            <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" className="text-white/5" strokeWidth="3" />
              <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor"
                className={goalProgress >= 1 ? "text-success" : "text-accent"}
                strokeWidth="3" strokeDasharray={`${goalProgress * 94.2} 94.2`} strokeLinecap="round" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold">
              {goalProgress >= 1 ? "✓" : `${Math.round(goalProgress * 100)}%`}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">Today: {todayReviewed}/{settings.dailyGoal} cards</p>
            <p className="text-xs text-white/40">{streak > 0 ? `🔥 ${streak} day streak` : "Start your streak!"}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-1">
        <p className="text-[11px] text-white/20">{topic.name}</p>
        <button onClick={toggleMute} className="text-white/30 hover:text-white/60 transition p-1">
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      </div>
      <ProgressBar phase={phase} />
      {phase === "warmup" && <WarmupPhase cards={sessionCards} onDone={handleWarmupDone} />}
      {phase === "conversation" && (
        <ConversationPhase topic={topic} muted={muted} onDone={handleConversationDone} />
      )}
      {phase === "review" && <ReviewPhase review={reviewData} onDone={() => setPhase("feedback")} />}
      {phase === "feedback" && <FeedbackPhase onFeedback={handleFeedback} />}
      {phase === "done" && <DonePhase onRestart={handleRestart} />}
    </main>
  );
}
