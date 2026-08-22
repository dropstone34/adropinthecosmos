import { ContentNode } from "../types";

export const cosmosNodes: ContentNode[] = [
  {
    id: "cosmos-scale",
    title: "The Scale of Everything",
    subtitle: "13.8 billion years",
    type: "idea",
    constellation: "cosmos",
    connections: ["whoami", "pale-blue-dot", "fermi-paradox", "vedic-cosmos"],
    weight: 1.0,
    tooltip: "The universe is 13.8 billion years old. You have ~80.",
    color: "#00D4FF",
    content: `The universe is 13.8 billion years old.
The Earth is 4.5 billion years old.
Life appeared 3.8 billion years ago.
Homo sapiens: 300,000 years.
Writing: 5,000 years.
The internet: 50 years.
You: a few decades.

The observable universe contains 2 trillion galaxies.
Each galaxy contains 100-400 billion stars.
The Milky Way alone: 100 billion stars.
Stars with planets: most of them.

You are made of atoms forged in stellar cores.
The iron in your blood was made in a supernova.
You are not in the universe. You are the universe
experiencing itself.

"We are a way for the cosmos to know itself."
— Carl Sagan`,
    meta: { age_of_universe: "13.8 billion years", galaxies: "2 trillion", stars_in_milky_way: "100 billion" },
  },
  {
    id: "pale-blue-dot",
    title: "Pale Blue Dot",
    subtitle: "Carl Sagan",
    type: "quote",
    constellation: "cosmos",
    connections: ["cosmos-scale", "whoami", "fermi-paradox"],
    weight: 0.85,
    tooltip: "Pale Blue Dot · Sagan · our planet is a lonely speck",
    color: "#00D4FF",
    content: `"Look again at that dot. That's here. That's home. That's us.
On it everyone you love, everyone you know, everyone you ever heard of,
every human being who ever was, lived out their lives.

The aggregate of our joy and suffering, thousands of confident religions,
ideologies, and economic doctrines, every hunter and forager,
every hero and coward, every creator and destroyer of civilization,
every king and peasant, every young couple in love,
every mother and father, hopeful child, inventor and explorer,
every teacher of morals, every corrupt politician,
every 'superstar,' every 'supreme leader,' every saint and sinner
in the history of our species lived there —
on a mote of dust suspended in a sunbeam.

Our planet is a lonely speck in the great enveloping cosmic dark.
In our obscurity, in all this vastness, there is no hint
that help will come from elsewhere to save us from ourselves."

— Carl Sagan, 1994

This is the most important paragraph written in the 20th century.
I read it when I need perspective.`,
    meta: { author: "Carl Sagan", year: "1994", source: "Pale Blue Dot: A Vision of the Human Future in Space" },
  },
  {
    id: "fermi-paradox",
    title: "The Fermi Paradox",
    subtitle: "where is everybody?",
    type: "idea",
    constellation: "cosmos",
    connections: ["cosmos-scale", "pale-blue-dot", "vedic-cosmos"],
    weight: 0.75,
    tooltip: "Fermi Paradox · where is everybody? · the great silence",
    color: "#00D4FF",
    content: `The universe is 13.8 billion years old.
There are 2 trillion galaxies.
The conditions for life are common.
Life on Earth appeared almost immediately after conditions allowed.

So where is everybody?

This is the Fermi Paradox. Enrico Fermi asked it over lunch in 1950.
We still don't have an answer.

The possible answers, in order of increasing dread:

1. We are alone (rare Earth hypothesis)
2. Life is common, intelligence is rare
3. Intelligence is common, technology is rare
4. Technology is common, but civilizations destroy themselves
5. They are here, but we cannot perceive them
6. The Great Filter is ahead of us

Option 4 is the one that keeps me up at night.
The Great Filter — the barrier that prevents civilizations
from becoming interstellar — might be nuclear weapons,
climate change, or something we haven't invented yet.

Or maybe the silence is the answer.`,
    meta: { proposed_by: "Enrico Fermi", year: "1950", status: "Unsolved" },
  },
  {
    id: "vedic-cosmos",
    title: "Vedic Cosmology",
    subtitle: "the infinite in ancient texts",
    type: "idea",
    constellation: "cosmos",
    connections: ["cosmos-scale", "fermi-paradox", "manifesto"],
    weight: 0.7,
    tooltip: "Vedic Cosmology · the infinite · Brahman and the cosmos",
    color: "#00D4FF",
    content: `The Vedic cosmologists were doing astrophysics
3,000 years before the telescope.

The Rigveda describes the universe as emerging from a void —
"neither existence nor non-existence" — through a creative act.
The Upanishads describe Brahman as the infinite ground of being,
from which all things emerge and to which all things return.

The Puranas describe cosmic time in cycles:
a Kalpa (one day of Brahma) = 4.32 billion years.
The current age of the universe: 13.8 billion years.
Three Kalpas.

This is not coincidence. It is the human mind
reaching for the same truth from different directions.

"Aham Brahmasmi" — I am the universe.
"Tat tvam asi" — That thou art.

The drop contains the ocean.
The ocean is made of drops.`,
    meta: { tradition: "Vedic/Hindu", texts: "Rigveda, Upanishads, Puranas" },
  },
  {
    id: "nasa-apod",
    title: "NASA APOD",
    subtitle: "today's cosmos",
    type: "stat",
    constellation: "cosmos",
    connections: ["cosmos-scale", "pale-blue-dot"],
    weight: 0.6,
    tooltip: "NASA Astronomy Picture of the Day · live",
    color: "#00D4FF",
    content: `Every day, NASA publishes one image of the cosmos.

Sometimes it is a galaxy 13 billion light-years away.
Sometimes it is a nebula where stars are being born.
Sometimes it is our own Sun in ultraviolet.

Each image is a reminder of scale.
Each image is a reminder that we are small.
Each image is a reminder that small things
can perceive large things.

That is remarkable.`,
  },
];