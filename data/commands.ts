import { TerminalCommand } from "./types";

export const TERMINAL_COMMANDS: TerminalCommand[] = [
  {
    command: "whoami",
    description: "identify the drop",
    type: "navigate",
    navigateTo: "whoami",
    output: `Prakhar
Software Engineer @ Qualcomm (Agentic AI & Bluetooth)
Lichess: Dropstone34 | 10k PR: 48:00
a drop in the cosmos.

→ try: explore · wander · build · mind · cosmos · arena`,
  },
  {
    command: "explore",
    description: "show all constellations",
    type: "info",
    output: `◈ CONSTELLATIONS

  drop    — the center, the anchor
  build   — what I make
  mind    — what I think
  cosmos  — what I wonder
  arena   — how I compete

→ type any constellation name to enter it`,
  },
  {
    command: "wander",
    description: "go somewhere unexpected",
    type: "navigate",
    output: "wandering...",
  },
  {
    command: "build",
    description: "engineering work and projects",
    type: "navigate",
    output: `opening /build...`,
  },
  {
    command: "mind",
    description: "enter the mind constellation",
    type: "navigate",
    navigateTo: "will-to-power",
    output: `◈ MIND — what I think

  books       — 7 books that shaped me
  philosophy  — Nietzsche, Rousseau, Smith, Dostoevsky
  frost       — Stopping by Woods on a Snowy Evening

→ type: books · philosophy · frost`,
  },
  {
    command: "cosmos",
    description: "enter the cosmos constellation",
    type: "navigate",
    navigateTo: "cosmos-scale",
    output: `◈ COSMOS — what I wonder

  scale       — 13.8 billion years
  pale-blue-dot — Carl Sagan
  fermi       — where is everybody?
  vedic       — ancient cosmology

→ type any name to explore`,
  },
  {
    command: "arena",
    description: "enter the arena constellation",
    type: "navigate",
    navigateTo: "chess-rating",
    output: `◈ ARENA — how I compete

  chess       — Lichess: Dropstone34 (live rating)
  football    — Cruyff, tiki-taka, total football
  f1          — Max Verstappen + Ferrari
  running     — 10k PR: 48:00

→ type any name to explore`,
  },
  {
    command: "chess",
    description: "chess stats and philosophy",
    type: "live",
    navigateTo: "chess-rating",
    output: `fetching Lichess data for Dropstone34...`,
  },
  {
    command: "books",
    description: "the reading list",
    type: "info",
    output: `◈ BOOKS — the ones that stayed

  Man's Search for Meaning    — Viktor Frankl
  Animal Farm                 — George Orwell
  Listening to Grasshoppers   — Arundhati Roy
  A Little Larger Than the    — Fernando Pessoa
    Entire Universe
  The Master and Margarita    — Mikhail Bulgakov
  The Silent Patient          — Alex Michaelides
  Roots of Romanticism        — Isaiah Berlin

→ type any title (e.g. 'frankl') to read more`,
  },
  {
    command: "now",
    description: "current signals",
    type: "navigate",
    output: `opening /now...`,
  },
  {
    command: "essays",
    description: "long-form writing",
    type: "navigate",
    output: `opening /essays...`,
  },
  {
    command: "notes",
    description: "short garden entries",
    type: "navigate",
    output: `opening /notes...`,
  },
  {
    command: "signals",
    description: "live public signals",
    type: "navigate",
    output: `opening /signals...`,
  },
  {
    command: "github",
    description: "open GitHub profile",
    type: "info",
    output: `opening github.com/dropstone34...`,
  },
  {
    command: "linkedin",
    description: "open LinkedIn profile",
    type: "info",
    output: `opening linkedin.com/in/prakhar34...`,
  },
  {
    command: "hire",
    description: "work with me",
    type: "navigate",
    output: `opening /hire...`,
  },
  {
    command: "subscribe",
    description: "subscribe to my Substack",
    type: "info",
    output: `→ Substack: substack.com/@dropstone
  
  Essays on: astrophysics, philosophy, chess, geopolitics,
  and the strange connections between them.
  
  "a drop in the cosmos" — irregular, honest, curious.`,
  },
  {
    command: "cat manifesto.txt",
    aliases: ["manifesto"],
    description: "read the manifesto",
    type: "navigate",
    navigateTo: "manifesto",
    output: `reading manifesto.txt...`,
  },
  {
    command: "sudo rm -rf /doubts",
    description: "",
    type: "easter-egg",
    output: `rm: cannot remove '/doubts': Permission denied
The doubts persist. They always do.
That is how you know you are thinking.`,
  },
  {
    command: "sudo rm -rf /ego",
    description: "",
    type: "easter-egg",
    output: `rm: cannot remove '/ego': Operation not permitted
The ego is a kernel process. It cannot be killed.
Only observed.`,
  },
  {
    command: "git log --oneline",
    description: "",
    type: "easter-egg",
    output: `a3f9d2e feat: added curiosity (age 7)
b1c4e8f fix: removed certainty (age 16)
d7a2b3c chore: read Dostoevsky (age 19)
e9f1c4a feat: learned chess openings
2b8d7e1 fix: unlearned chess openings
f3a9c2d feat: ran first 10k
1e7b4f8 refactor: rewrote worldview (ongoing)
HEAD    feat: a drop in the cosmos`,
  },
  {
    command: "chess --dubov",
    description: "",
    type: "easter-egg",
    output: `Loading Dubov game...

  Daniil Dubov vs Magnus Carlsen
  World Blitz Championship 2019
  
  "I don't calculate. I feel."
  
  1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7
  6. Re1 b5 7. Bb3 O-O 8. c3 d5 9. exd5 Nxd5 10. Nxe5...
  
  [The game continues into beautiful chaos]
  
  → lichess.org/@/Dropstone34 to play me`,
  },
  {
    command: "make me a sandwich",
    aliases: ["sudo make me a sandwich"],
    description: "",
    type: "easter-egg",
    output: `Error: no sandwich module found.
Try running instead. It helps.`,
  },
  {
    command: "man life",
    description: "",
    type: "easter-egg",
    output: `LIFE(1)                    User Commands                    LIFE(1)

NAME
    life — a brief, improbable existence

SYNOPSIS
    life [--curious] [--persistent] [--present]

DESCRIPTION
    life is a single-threaded process with no restart capability.
    It accepts input from: experience, books, people, failure.
    It produces output in: work, relationships, understanding.

    The --curious flag is strongly recommended.
    The --persistent flag is required for meaningful output.
    The --present flag is the hardest to maintain.

BUGS
    Many. See: history, philosophy, your own life.

SEE ALSO
    frankl(1), nietzsche(1), sagan(1), frost(1)

AUTHOR
    Unknown. Possibly the cosmos.`,
  },
  {
    command: "help",
    description: "show available commands",
    type: "info",
    output: `◈ COMMANDS

  whoami      — identify the drop
  explore     — show all constellations
  wander      — go somewhere unexpected
  
  now         — current signals
  essays      — long-form writing
  notes       — short garden entries
  build       — engineering work and projects
  signals     — live public signals
  
  mind        — what I think
  cosmos      — what I wonder
  arena       — how I compete
  
  chess       — live chess rating
  books       — the reading list
  github      — open GitHub
  linkedin    — open LinkedIn
  hire        — work with me
  subscribe   — Substack newsletter
  manifesto   — what I believe
  
  [there are other commands. find them.]`,
  },
];