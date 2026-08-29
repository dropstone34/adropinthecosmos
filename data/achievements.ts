export type CosmosType = "inner" | "outer";
export type LiveDataSource = "lichess" | "strava" | null;

export interface AchievementStat {
  label: string;
  value: string;
  max?: number;
  current?: number;
}

export interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  cosmos: CosmosType;
  emoji: string;
  liveData: LiveDataSource;
  stats: AchievementStat[];
  description: string;
  shapedMe: string;
  tags: string[];
  accentColor: string;
  span?: "normal" | "wide";
}

export const achievements: Achievement[] = [
  {
    id: "rock-climbing",
    title: "Rock Climbing",
    subtitle: "5A grade — vertical worlds",
    cosmos: "outer",
    emoji: "🧗",
    liveData: null,
    stats: [
      { label: "Grade", value: "5A" },
      { label: "Style", value: "Sport" },
    ],
    description:
      "Reached 5A grade in sport climbing. Every route is a puzzle — reading the wall, trusting friction, committing to the move.",
    shapedMe:
      "Climbing taught me that fear is information, not a stop sign. The moment you stop overthinking and commit to the hold is the moment you stop falling. That lesson transfers everywhere.",
    tags: ["physical", "problem-solving", "fear"],
    accentColor: "#f97316",
  },
  {
    id: "football",
    title: "Football",
    subtitle: "14 years — tiki-taka devotee",
    cosmos: "outer",
    emoji: "⚽",
    liveData: null,
    stats: [
      { label: "Years", value: "14" },
      { label: "Style", value: "Tiki-taka" },
      { label: "Position", value: "Midfielder" },
    ],
    description:
      "Fourteen years of football. Cruyff's philosophy — the ball moves faster than any player. Space is the real opponent.",
    shapedMe:
      "Football gave me systems thinking before I knew what that was. Eleven individuals become one organism when the passes click. I look for that same rhythm in code, in teams, in conversations.",
    tags: ["team", "systems", "14 years"],
    accentColor: "#22c55e",
    span: "wide",
  },
  {
    id: "chess",
    title: "Chess",
    subtitle: "FIDE rated · Lichess: Dropstone34",
    cosmos: "inner",
    emoji: "♟",
    liveData: "lichess",
    stats: [
      { label: "Handle", value: "Dropstone34" },
      { label: "Platform", value: "Lichess + FIDE" },
    ],
    description:
      "FIDE rated player. On Lichess as Dropstone34 — the same handle as this portfolio. Chess is the purest arena: no luck, no teammates, just pattern recognition and will.",
    shapedMe:
      "Chess rewired how I think under pressure. The clock is always running. You learn to make good-enough decisions fast rather than perfect decisions never. Blunder recovery is a skill.",
    tags: ["strategy", "FIDE", "Lichess"],
    accentColor: "#a78bfa",
  },
  {
    id: "travel",
    title: "Travel",
    subtitle: "6 destinations — coordinates collected",
    cosmos: "outer",
    emoji: "🌍",
    liveData: null,
    stats: [
      { label: "Destinations", value: "6" },
      { label: "Continents", value: "1" },
    ],
    description:
      "Six destinations and counting. Each place recalibrates your sense of scale — what feels enormous at home becomes a dot on the map.",
    shapedMe:
      "Travel is the fastest way to dissolve assumptions. You realize your defaults — food, language, time, space — are just one configuration among thousands. That humility is useful everywhere.",
    tags: ["exploration", "perspective", "geography"],
    accentColor: "#06b6d4",
  },
  {
    id: "possessions",
    title: "Possessions",
    subtitle: "Jordan · S23 · Casio · Adizero · Nitroboost",
    cosmos: "outer",
    emoji: "🎽",
    liveData: null,
    stats: [
      { label: "Sneakers", value: "Air Jordan" },
      { label: "Watch", value: "Casio" },
      { label: "Phone", value: "Galaxy S23" },
      { label: "Shoes", value: "Adizero + Nitroboost" },
    ],
    description:
      "Curated possessions — each chosen deliberately. Jordan for the culture. Casio because simplicity is a statement. Adizero and Nitroboost for the road.",
    shapedMe:
      "Owning fewer things, but the right things, sharpens your relationship with objects. Each item earns its place. This is minimalism with taste — not asceticism.",
    tags: ["minimalism", "curation", "style"],
    accentColor: "#f59e0b",
  },
  {
    id: "academia",
    title: "Academia",
    subtitle: "UPSTSE · 99 percentile JEE",
    cosmos: "inner",
    emoji: "🎓",
    liveData: null,
    stats: [
      { label: "JEE", value: "99th percentile" },
      { label: "Award", value: "UPSTSE" },
    ],
    description:
      "UPSTSE scholarship recipient. 99th percentile in JEE — the exam that filters 1.5 million students down to a few thousand. The pressure was real; so was the preparation.",
    shapedMe:
      "The JEE taught me that sustained, deliberate effort compounds. Not talent — systems. The ability to sit with hard problems for hours without giving up is a muscle. I built it here.",
    tags: ["discipline", "systems", "engineering"],
    accentColor: "#3b82f6",
    span: "wide",
  },
  {
    id: "wpm",
    title: "Typing Speed",
    subtitle: "70+ WPM — thoughts at the speed of keys",
    cosmos: "inner",
    emoji: "⌨️",
    liveData: null,
    stats: [
      { label: "Speed", value: "70+ WPM", current: 70, max: 100 },
      { label: "Accuracy", value: "~97%" },
    ],
    description:
      "70+ words per minute with high accuracy. Fast enough that typing stops being a bottleneck between thought and output.",
    shapedMe:
      "Speed typing is a proxy for fluency. When the mechanical friction disappears, you think more clearly — the interface becomes invisible. That's the goal with any tool.",
    tags: ["productivity", "fluency", "tools"],
    accentColor: "#8b5cf6",
  },
  {
    id: "gym",
    title: "Gym",
    subtitle: "Bench 60kg · Deadlift 80kg · 6-pack",
    cosmos: "outer",
    emoji: "🏋️",
    liveData: null,
    stats: [
      { label: "Bench", value: "60 kg", current: 60, max: 100 },
      { label: "Deadlift", value: "80 kg", current: 80, max: 150 },
      { label: "Body", value: "6-pack" },
    ],
    description:
      "Bench press 60kg, deadlift 80kg, visible six-pack. The gym is the one place where the feedback loop is immediate and honest — you either lifted it or you didn't.",
    shapedMe:
      "The gym is philosophy made physical. Progressive overload is just the growth mindset with barbells. Consistency over intensity. Show up when you don't want to — that's the whole lesson.",
    tags: ["discipline", "physical", "consistency"],
    accentColor: "#ef4444",
  },
  {
    id: "running",
    title: "Running",
    subtitle: "250 km goal in 2026",
    cosmos: "outer",
    emoji: "🏃",
    liveData: "strava",
    stats: [
      { label: "Goal", value: "250 km", current: 0, max: 250 },
      { label: "Year", value: "2026" },
    ],
    description:
      "Tracking 250km in 2026 via Strava. Running is the oldest technology — just a body, a road, and a decision to keep moving.",
    shapedMe:
      "Long runs are moving meditation. The first 2km are always a lie — your body protests, your mind negotiates. Push through and something shifts. That shift is the point.",
    tags: ["endurance", "Strava", "2026"],
    accentColor: "#10b981",
    span: "wide",
  },
  {
    id: "writing",
    title: "Writing",
    subtitle: "Creative expression — words as cosmos",
    cosmos: "inner",
    emoji: "✍️",
    liveData: null,
    stats: [
      { label: "Form", value: "Essays + Notes" },
      { label: "Influences", value: "Pessoa, Orwell" },
    ],
    description:
      "Writing as a way of thinking. Essays, notes, fragments. Influenced by Pessoa's heteronyms, Orwell's clarity, Nietzsche's aphorisms.",
    shapedMe:
      "Writing forces precision. You can hold a vague idea in your head indefinitely — the moment you try to write it, the vagueness becomes visible. Writing is how I find out what I actually think.",
    tags: ["expression", "clarity", "essays"],
    accentColor: "#e879f9",
  },
];

export const COSMOS_COLORS = {
  inner: {
    primary: "#7c3aed",
    secondary: "#3b82f6",
    glow: "rgba(124, 58, 237, 0.25)",
    border: "rgba(124, 58, 237, 0.3)",
    label: "🧠 Inner Cosmos",
  },
  outer: {
    primary: "#f59e0b",
    secondary: "#ef4444",
    glow: "rgba(245, 158, 11, 0.2)",
    border: "rgba(245, 158, 11, 0.3)",
    label: "🌍 Outer Cosmos",
  },
};