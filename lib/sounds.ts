"use client";

type ConstellationId = "drop" | "build" | "mind" | "cosmos" | "arena";

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    try {
      ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch {
      return null;
    }
  }
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }
  return ctx;
}

function tone(freq: number, type: OscillatorType, duration: number, gain: number, delay = 0) {
  const ac = getCtx();
  if (!ac) return;

  const osc = ac.createOscillator();
  const g = ac.createGain();

  osc.connect(g);
  g.connect(ac.destination);

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ac.currentTime + delay);

  g.gain.setValueAtTime(0, ac.currentTime + delay);
  g.gain.linearRampToValueAtTime(gain, ac.currentTime + delay + 0.02);
  g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + delay + duration);

  osc.start(ac.currentTime + delay);
  osc.stop(ac.currentTime + delay + duration + 0.05);
}

const ENTRY_TONES: Record<ConstellationId, () => void> = {
  cosmos: () => {
    tone(528, "sine", 0.9, 0.07);
    tone(741, "sine", 0.7, 0.04, 0.1);
    tone(1056, "sine", 0.5, 0.025, 0.22);
  },
  mind: () => {
    tone(293, "sine", 0.7, 0.07);
    tone(440, "sine", 0.55, 0.045, 0.09);
  },
  build: () => {
    tone(261, "square", 0.12, 0.035);
    tone(523, "sine", 0.55, 0.055, 0.06);
  },
  arena: () => {
    tone(330, "sawtooth", 0.1, 0.055);
    tone(660, "sine", 0.35, 0.04, 0.06);
  },
  drop: () => {
    tone(110, "sine", 1.1, 0.08);
    tone(220, "sine", 0.9, 0.05, 0.12);
    tone(165, "sine", 0.7, 0.03, 0.25);
  },
};

const NODE_BASE_FREQ: Record<ConstellationId, number> = {
  cosmos: 528,
  mind: 293,
  build: 261,
  arena: 330,
  drop: 110,
};

let soundEnabled = true;

export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
}

export function isSoundEnabled() {
  return soundEnabled;
}

export function playConstellationEntry(constellation: ConstellationId) {
  if (!soundEnabled) return;
  try {
    ENTRY_TONES[constellation]?.();
  } catch {}
}

export function playNodeEntry(constellation: ConstellationId) {
  if (!soundEnabled) return;
  try {
    tone(NODE_BASE_FREQ[constellation] * 1.5, "sine", 0.45, 0.05);
  } catch {}
}

export function playNavigateBack() {
  if (!soundEnabled) return;
  try {
    tone(440, "sine", 0.3, 0.05);
    tone(330, "sine", 0.3, 0.04, 0.1);
    tone(220, "sine", 0.3, 0.03, 0.2);
  } catch {}
}

export function playError() {
  if (!soundEnabled) return;
  try {
    tone(200, "sawtooth", 0.15, 0.04);
  } catch {}
}