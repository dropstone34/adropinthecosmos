"use client";

// Lightweight site intelligence — session-stable, no external API
// Tracks visitor interest across constellations and surfaces adaptive hints

export type Constellation = "drop" | "build" | "mind" | "cosmos" | "arena";

export interface InterestVector {
  drop: number;
  build: number;
  mind: number;
  cosmos: number;
  arena: number;
}

export interface SiteSignal {
  dominant: Constellation | null;
  vector: InterestVector;
  sessionDepth: number;
  hint: string;
  tobaccoNote: string;
}

const STORAGE_KEY = "adrop_signal_v1";

const HINTS: Record<Constellation, string[]> = {
  drop: [
    "you keep returning to the center",
    "the drop knows where it falls",
    "identity as gravity",
    "everything orbits something",
  ],
  build: [
    "a builder in the cosmos",
    "systems thinking, systems making",
    "the architecture of thought",
    "code as a form of writing",
  ],
  mind: [
    "the examined life",
    "Nietzsche would approve",
    "reading as a form of travel",
    "ideas leave marks",
  ],
  cosmos: [
    "the Fermi Paradox has no answer yet",
    "astrophysics as humility",
    "you are made of stellar debris",
    "the universe is not indifferent — it is vast",
  ],
  arena: [
    "competition as clarity",
    "the board never lies",
    "endgame theory applies everywhere",
    "pressure reveals structure",
  ],
};

// Wild tobacco accord — rotates slowly, seeded by time
const TOBACCO_NOTES = [
  "trace: wild tobacco / dry leaf / ozone",
  "note: cured leaf / amber resin / open air",
  "accord: tobacco flower / warm earth / dusk",
  "signal: dry grass / smoke / distant rain",
  "trace: wild tobacco / cedar / night air",
  "note: sun-dried leaf / pollen / still heat",
];

function emptyVector(): InterestVector {
  return { drop: 0, build: 0, mind: 0, cosmos: 0, arena: 0 };
}

function loadVector(): InterestVector {
  if (typeof window === "undefined") return emptyVector();
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyVector();
    return JSON.parse(raw) as InterestVector;
  } catch {
    return emptyVector();
  }
}

function saveVector(v: InterestVector) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(v));
  } catch {
    // storage unavailable — silent
  }
}

export function recordInterest(constellation: Constellation) {
  const v = loadVector();
  v[constellation] = (v[constellation] || 0) + 1;
  saveVector(v);
}

export function getSignal(): SiteSignal {
  const v = loadVector();
  const total = Object.values(v).reduce((a, b) => a + b, 0);

  let dominant: Constellation | null = null;
  let maxVal = 0;
  for (const [k, val] of Object.entries(v)) {
    if (val > maxVal) {
      maxVal = val;
      dominant = k as Constellation;
    }
  }

  // Hint rotates every 30 seconds within the dominant constellation's pool
  const hints = dominant ? HINTS[dominant] : ["a drop in the cosmos", "signal acquiring…", "somewhere between stars"];
  const hint = hints[Math.floor(Date.now() / 30000) % hints.length];

  // Tobacco note rotates every 2 minutes — slow, ambient
  const noteIndex = Math.floor(Date.now() / 120000) % TOBACCO_NOTES.length;
  const tobaccoNote = TOBACCO_NOTES[noteIndex];

  return { dominant, vector: v, sessionDepth: total, hint, tobaccoNote };
}

// Returns a 0–1 normalized weight for a constellation
export function constellationWeight(constellation: Constellation): number {
  const v = loadVector();
  const total = Object.values(v).reduce((a, b) => a + b, 0);
  if (total === 0) return 0;
  return (v[constellation] || 0) / total;
}