import { ContentNode } from "../types";

export const dropNodes: ContentNode[] = [
  {
    id: "whoami",
    title: "Prakhar",
    subtitle: "a drop in the cosmos",
    type: "idea",
    constellation: "drop",
    connections: ["qualcomm", "chess-rating", "running-pr", "cosmos-scale", "will-to-power"],
    weight: 1.0,
    tooltip: "whoami → Prakhar · Software Engineer · a drop in the cosmos",
    content: `I am Prakhar.

Software Engineer at Qualcomm, working on Agentic AI and Bluetooth systems.
Chess player (Lichess: Dropstone34). Runner. Reader. Wonderer.

The name of this site is not metaphor — it is physics.
Every atom in your body was forged in a star.
You are, literally, a drop in the cosmos.

I spend my time building things, reading things,
running through things, and thinking about the distance
between what we know and what we can imagine.

"The cosmos is within us. We are made of star-stuff."
— Carl Sagan`,
    meta: { location: "India", role: "Software Engineer" },
  },
  {
    id: "manifesto",
    title: "manifesto.txt",
    subtitle: "what I believe",
    type: "idea",
    constellation: "drop",
    connections: ["whoami", "will-to-power", "frost-poem", "cosmos-scale"],
    weight: 0.7,
    tooltip: "cat manifesto.txt",
    content: `I believe in the examined life.
I believe that curiosity is a moral virtue.
I believe that the distance between a chess opening
and a geopolitical strategy is smaller than it appears.

I believe Cruyff was right: it is not about the ball,
it is about the space.

I believe Nietzsche was misread — the will to power
is not domination, it is self-overcoming.

I believe the Vedic cosmologists and the astrophysicists
are asking the same question from different directions.

I believe Frost stopped by those woods because
he needed to remember he had promises to keep.

I believe a 10k in 48 minutes is a conversation
with your own limits.

I believe in building things that matter.
I believe in the long run.`,
  },
];