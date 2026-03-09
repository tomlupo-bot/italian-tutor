type FeedbackKind = "success" | "warning" | "error";

function vibratePattern(kind: FeedbackKind): number[] | number {
  if (kind === "success") return 18;
  if (kind === "warning") return [12, 18, 12];
  return [18, 28, 18];
}

let audioContext: AudioContext | null = null;

function playTone(kind: FeedbackKind) {
  if (typeof window === "undefined") return;
  const AudioCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtor) return;
  audioContext = audioContext ?? new AudioCtor();
  const ctx = audioContext;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const now = ctx.currentTime;

  osc.type = kind === "success" ? "sine" : "triangle";
  osc.frequency.setValueAtTime(kind === "success" ? 740 : kind === "warning" ? 420 : 220, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.035, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.15);
}

export function triggerAnswerFeedback(kind: FeedbackKind) {
  if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
    navigator.vibrate(vibratePattern(kind));
  }
  playTone(kind);
}
