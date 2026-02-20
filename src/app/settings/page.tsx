"use client";

import { useState, useEffect } from "react";
import { loadSettings, saveSettings, resetSRSData, exportAllData, type PracticeMode } from "../../lib/storage";
import { cn } from "../../lib/cn";

const GOALS = [10, 15, 20, 25, 30];
const RATES = [
  { value: 0.7, label: "Slow (0.7x)" },
  { value: 0.85, label: "Normal (0.85x)" },
  { value: 1.0, label: "Fast (1.0x)" },
];
const MODES: { key: PracticeMode; label: string }[] = [
  { key: "classic", label: "🇮🇹→🇬🇧 Classic" },
  { key: "reverse", label: "🇬🇧→🇮🇹 Reverse" },
  { key: "listening", label: "🎧 Listening" },
  { key: "cloze", label: "📝 Cloze" },
];

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const [dailyGoal, setDailyGoal] = useState(20);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [speechRate, setSpeechRate] = useState(0.85);
  const [preferredMode, setPreferredMode] = useState<PracticeMode>("classic");
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    const s = loadSettings();
    setDailyGoal(s.dailyGoal);
    setAutoSpeak(s.autoSpeak);
    setSpeechRate(s.speechRate);
    setPreferredMode(s.preferredMode);
    setMounted(true);
  }, []);

  const update = (key: string, value: unknown) => {
    saveSettings({ [key]: value } as Record<string, unknown>);
  };

  const handleExport = () => {
    const data = exportAllData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `italian-tutor-export-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    resetSRSData();
    setShowResetConfirm(false);
    window.location.reload();
  };

  if (!mounted) {
    return (
      <main className="min-h-screen flex items-center justify-center max-w-lg mx-auto pb-20">
        <p className="text-white/40">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen max-w-lg mx-auto pb-20 px-4 py-6 space-y-6">
      <h1 className="text-xl font-semibold text-accent-light text-center">⚙️ Settings</h1>

      {/* Daily Goal */}
      <div className="bg-card rounded-xl border border-white/10 p-4 space-y-3">
        <h2 className="text-sm font-medium text-white/60">Daily Goal</h2>
        <div className="flex gap-2">
          {GOALS.map((g) => (
            <button
              key={g}
              onClick={() => { setDailyGoal(g); update("dailyGoal", g); }}
              className={cn(
                "flex-1 py-2 rounded-lg text-sm font-medium transition",
                dailyGoal === g ? "bg-accent text-white" : "bg-white/5 text-white/40 hover:bg-white/10"
              )}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Auto-speak */}
      <div className="bg-card rounded-xl border border-white/10 p-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium">Auto-speak on card appear</h2>
          <p className="text-xs text-white/40">Automatically play pronunciation</p>
        </div>
        <button
          onClick={() => { setAutoSpeak(!autoSpeak); update("autoSpeak", !autoSpeak); }}
          className={cn(
            "w-12 h-7 rounded-full transition-colors relative",
            autoSpeak ? "bg-accent" : "bg-white/10"
          )}
        >
          <div className={cn(
            "w-5 h-5 rounded-full bg-white absolute top-1 transition-all",
            autoSpeak ? "left-6" : "left-1"
          )} />
        </button>
      </div>

      {/* Speech Rate */}
      <div className="bg-card rounded-xl border border-white/10 p-4 space-y-3">
        <h2 className="text-sm font-medium text-white/60">Speech Rate</h2>
        <div className="flex gap-2">
          {RATES.map((r) => (
            <button
              key={r.value}
              onClick={() => { setSpeechRate(r.value); update("speechRate", r.value); }}
              className={cn(
                "flex-1 py-2 rounded-lg text-xs font-medium transition",
                speechRate === r.value ? "bg-accent text-white" : "bg-white/5 text-white/40 hover:bg-white/10"
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Preferred Mode */}
      <div className="bg-card rounded-xl border border-white/10 p-4 space-y-3">
        <h2 className="text-sm font-medium text-white/60">Default Practice Mode</h2>
        <div className="grid grid-cols-2 gap-2">
          {MODES.map((m) => (
            <button
              key={m.key}
              onClick={() => { setPreferredMode(m.key); update("preferredMode", m.key); }}
              className={cn(
                "py-2 rounded-lg text-xs font-medium transition",
                preferredMode === m.key ? "bg-accent text-white" : "bg-white/5 text-white/40 hover:bg-white/10"
              )}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Export */}
      <button
        onClick={handleExport}
        className="w-full py-3 bg-white/5 rounded-xl text-sm font-medium text-white/60 hover:bg-white/10 transition"
      >
        📦 Export Data as JSON
      </button>

      {/* Reset */}
      {!showResetConfirm ? (
        <button
          onClick={() => setShowResetConfirm(true)}
          className="w-full py-3 bg-danger/10 rounded-xl text-sm font-medium text-danger hover:bg-danger/20 transition"
        >
          🗑️ Reset SRS Data
        </button>
      ) : (
        <div className="bg-danger/10 rounded-xl border border-danger/30 p-4 space-y-3">
          <p className="text-sm text-danger">Are you sure? This will reset all review progress.</p>
          <div className="flex gap-3">
            <button onClick={() => setShowResetConfirm(false)} className="flex-1 py-2 bg-white/5 rounded-lg text-sm">
              Cancel
            </button>
            <button onClick={handleReset} className="flex-1 py-2 bg-danger rounded-lg text-sm font-medium">
              Yes, Reset
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
