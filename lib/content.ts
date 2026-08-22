export type ContentStatus = "private" | "draft" | "public";

export interface Essay {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readingTime: string;
  tags: string[];
  status: ContentStatus;
  excerpt: string;
  body: string;
}

export interface Note {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  status: ContentStatus;
  excerpt: string;
  body: string;
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  source?: string;
  tags: string[];
  status: ContentStatus;
}

export const essays: Essay[] = [
  {
    slug: "site-as-constellation",
    title: "The site as a constellation",
    subtitle: "A personal website should not be a resume with stars pasted on top.",
    date: "2026-08-22",
    readingTime: "4 min",
    tags: ["meta", "portfolio", "cosmos"],
    status: "public",
    excerpt:
      "The better version of this site is not louder. It is clearer: a living map of how I build, think, compete, and make meaning.",
    body: `A personal website should not be a resume with stars pasted on top.

It should have gravity.

This one began as a cosmic terminal: a boot sequence, a field of nodes, a way to make a portfolio feel less like a LinkedIn export and more like a place. But the danger of any constellation is that everything can start to look equally important. Qualcomm, Nietzsche, chess, running, Bluetooth, Pessoa, Formula 1, the Fermi paradox — they need a spine.

The spine is simple:

I build systems.
I read to stay human.
I compete to stay honest.
I look at the cosmos to stay small.

The site is becoming a living map of those four motions.`,
  },
  {
    slug: "will-to-power-in-engineering",
    title: "Will to power in engineering",
    subtitle: "Self-overcoming, not domination.",
    date: "2026-08-18",
    readingTime: "5 min",
    tags: ["engineering", "nietzsche", "craft"],
    status: "public",
    excerpt:
      "The best engineers I know do not chase control. They chase sharper models of reality.",
    body: `Nietzsche's will to power is usually misread as domination.

In engineering, the useful reading is self-overcoming.

A system fails. You learn.
A protocol behaves differently in the field than in the lab. You update your model.
A bug survives three reviews. You become more humble.

The best engineers I know do not chase control. They chase sharper models of reality. They want to understand the machine well enough that their ego disappears into the work.

That is the version of ambition I trust.`,
  },
];

export const notes: Note[] = [
  {
    slug: "personal-os",
    title: "Personal OS",
    date: "2026-08-22",
    tags: ["systems", "notes", "future"],
    status: "public",
    excerpt:
      "The long-term direction is not just a portfolio. It is a private-to-public thinking system.",
    body: `The site should eventually have a private layer and a public layer.

Private: quick captures, imported notes, rough fragments, half-formed questions.

Public: essays, quote cards, constellations, polished canvases.

The mistake would be dumping everything online. The better pattern is: capture privately, curate deliberately, publish sparingly.`,
  },
  {
    slug: "miles-to-go",
    title: "Miles to go",
    date: "2026-08-17",
    tags: ["running", "frost", "discipline"],
    status: "public",
    excerpt:
      "Running is useful because the body cannot be persuaded by abstractions.",
    body: `Running is useful because the body cannot be persuaded by abstractions.

At kilometer eight, philosophy has to become operational.

The Frost line works because it is not motivational. It is contractual.

The woods are lovely, dark and deep —
but there are promises.`,
  },
];

export const quotes: Quote[] = [
  {
    id: "frankl-space",
    text: "Between stimulus and response there is a space. In that space is our power to choose our response.",
    author: "Viktor Frankl",
    source: "Man's Search for Meaning",
    tags: ["meaning", "agency"],
    status: "public",
  },
  {
    id: "sagan-cosmos",
    text: "We are a way for the cosmos to know itself.",
    author: "Carl Sagan",
    source: "Cosmos",
    tags: ["cosmos", "science"],
    status: "public",
  },
  {
    id: "frost-promises",
    text: "The woods are lovely, dark and deep, but I have promises to keep.",
    author: "Robert Frost",
    source: "Stopping by Woods on a Snowy Evening",
    tags: ["running", "poetry"],
    status: "public",
  },
  {
    id: "pessoa-gap",
    text: "I'm the gap between my desire and what life has made of me.",
    author: "Fernando Pessoa",
    tags: ["poetry", "self"],
    status: "public",
  },
];

export function getPublicEssays() {
  return essays.filter((essay) => essay.status === "public");
}

export function getPublicNotes() {
  return notes.filter((note) => note.status === "public");
}

export function getPublicQuotes() {
  return quotes.filter((quote) => quote.status === "public");
}

export function getQuoteOfTheDay(date = new Date()) {
  const publicQuotes = getPublicQuotes();
  const start = new Date(date.getFullYear(), 0, 0);
  const day = Math.floor((date.getTime() - start.getTime()) / 86_400_000);
  return publicQuotes[day % publicQuotes.length];
}

export function getLatestSignals() {
  const latestEssay = getPublicEssays()[0];
  const latestNote = getPublicNotes()[0];
  const quote = getQuoteOfTheDay();

  return [
    {
      label: "essay",
      title: latestEssay.title,
      href: `/essays/${latestEssay.slug}`,
      detail: latestEssay.subtitle,
    },
    {
      label: "note",
      title: latestNote.title,
      href: `/notes/${latestNote.slug}`,
      detail: latestNote.excerpt,
    },
    {
      label: "quote",
      title: quote.author,
      href: "/now",
      detail: quote.text,
    },
    {
      label: "live",
      title: "Lichess + NASA",
      href: "/",
      detail: "Existing live signals remain part of the cosmic layer.",
    },
  ];
}