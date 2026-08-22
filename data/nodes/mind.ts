import { ContentNode } from "../types";

export const mindNodes: ContentNode[] = [
  {
    id: "mans-search",
    title: "Man's Search for Meaning",
    subtitle: "Viktor Frankl",
    type: "book",
    constellation: "mind",
    connections: ["whoami", "will-to-power", "dostoevsky", "manifesto"],
    weight: 0.9,
    tooltip: "Man's Search for Meaning · Frankl · the last human freedom",
    content: `Viktor Frankl survived Auschwitz and wrote this book.

The central thesis: meaning is not found, it is created.
Even in the most extreme suffering, the last human freedom
is the freedom to choose your response.

"Between stimulus and response there is a space.
In that space is our power to choose our response.
In our response lies our growth and our freedom."

This book changed how I think about difficulty.
A bad deployment at 2am is not suffering.
A 10k at 5:30am is not suffering.
Perspective is a practice.

The will to meaning > the will to pleasure > the will to power.
Frankl disagreed with Nietzsche on the hierarchy.
I think they were both right about different things.`,
    meta: { author: "Viktor Frankl", year: "1946", genre: "Philosophy/Memoir" },
  },
  {
    id: "animal-farm",
    title: "Animal Farm",
    subtitle: "George Orwell",
    type: "book",
    constellation: "mind",
    connections: ["listening-grasshoppers", "rousseau", "adam-smith", "will-to-power"],
    weight: 0.7,
    tooltip: "Animal Farm · Orwell · all animals are equal, but...",
    content: `"All animals are equal, but some animals are more equal than others."

Orwell wrote this in 1945. It has not aged.

Animal Farm is not about the Soviet Union.
It is about every revolution that eats its children.
It is about the gap between the stated ideal and the lived reality.
It is about language as a tool of power.

Read alongside Rousseau's Social Contract,
it becomes a devastating critique of the noble savage myth.
Read alongside Nietzsche, it becomes a study in
how the will to power corrupts the will to meaning.

The pigs did not start evil. That is the point.`,
    meta: { author: "George Orwell", year: "1945", genre: "Political Satire" },
  },
  {
    id: "listening-grasshoppers",
    title: "Listening to Grasshoppers",
    subtitle: "Arundhati Roy",
    type: "book",
    constellation: "mind",
    connections: ["animal-farm", "will-to-power", "adam-smith"],
    weight: 0.7,
    tooltip: "Listening to Grasshoppers · Roy · field notes on democracy",
    content: `Arundhati Roy writes about India the way
a surgeon writes about a patient she loves.

"Listening to Grasshoppers" is field notes on democracy —
on what happens when the machinery of the state
is turned against its own people.

Roy is uncomfortable. She is supposed to be.
The best political writing makes you squirm
because it names what you already know
but have been avoiding.

Her prose is also beautiful. That is the trap.
You come for the language and stay for the argument.`,
    meta: { author: "Arundhati Roy", year: "2009", genre: "Political Essays" },
  },
  {
    id: "pessoa-universe",
    title: "A Little Larger Than the Entire Universe",
    subtitle: "Fernando Pessoa",
    type: "book",
    constellation: "mind",
    connections: ["cosmos-scale", "frost-poem", "whoami", "manifesto"],
    weight: 0.8,
    tooltip: "Pessoa · a little larger than the entire universe · selected poems",
    content: `The title alone is the philosophy.

Fernando Pessoa wrote under multiple heteronyms —
Alberto Caeiro, Ricardo Reis, Álvaro de Campos —
each a different person, a different worldview,
a different relationship with existence.

He was not one person. He was a constellation.

"I'm the gap between my desire and what life has made of me."

The title of this collection — "A Little Larger Than the Entire Universe" —
is in direct conversation with the name of this site.
A drop in the cosmos. A little larger than the entire universe.
Both are true. Both are impossible. Both are human.`,
    meta: { author: "Fernando Pessoa", genre: "Poetry", language: "Portuguese/English" },
  },
  {
    id: "master-margarita",
    title: "The Master and Margarita",
    subtitle: "Mikhail Bulgakov",
    type: "book",
    constellation: "mind",
    connections: ["dostoevsky", "animal-farm", "will-to-power"],
    weight: 0.7,
    tooltip: "The Master and Margarita · Bulgakov · the devil visits Moscow",
    content: `The devil visits Soviet Moscow and chaos ensues.

Bulgakov wrote this novel in secret, knowing it could never
be published in his lifetime. He burned the first draft.
He rewrote it. He kept writing until he died.

The novel is about: the nature of evil, the cowardice of
the intelligentsia, the persistence of art, the impossibility
of destroying what is true.

"Cowardice is the greatest sin."

The Master burns his manuscript. Margarita saves it.
The devil, paradoxically, is the only honest character.

Read it as a companion to Animal Farm:
one is about the farm, one is about the city.
Both are about what happens to the human spirit
under totalitarian pressure.`,
    meta: { author: "Mikhail Bulgakov", year: "1967 (posthumous)", genre: "Magical Realism" },
  },
  {
    id: "silent-patient",
    title: "The Silent Patient",
    subtitle: "Alex Michaelides",
    type: "book",
    constellation: "mind",
    connections: ["master-margarita"],
    weight: 0.4,
    tooltip: "The Silent Patient · Michaelides · sometimes I just want a thriller",
    content: `Sometimes I just want a thriller.

Not everything needs to be Dostoevsky.
The Silent Patient is a perfectly constructed puzzle —
a woman shoots her husband and never speaks again.
A therapist becomes obsessed with understanding why.

The twist is genuinely surprising.
The prose is clean. The pacing is relentless.

I include this here as an honest admission:
I am not always reading Nietzsche.
Sometimes I am reading this at 11pm
and I cannot put it down.

That is also a kind of meaning.`,
    meta: { author: "Alex Michaelides", year: "2019", genre: "Psychological Thriller" },
  },
  {
    id: "roots-romanticism",
    title: "The Roots of Romanticism",
    subtitle: "Isaiah Berlin",
    type: "book",
    constellation: "mind",
    connections: ["rousseau", "will-to-power", "frost-poem", "pessoa-universe"],
    weight: 0.7,
    tooltip: "Roots of Romanticism · Berlin · the counter-enlightenment",
    content: `Isaiah Berlin is the most readable philosopher of the 20th century.

"The Roots of Romanticism" traces how the Romantic movement
was a reaction against the Enlightenment's faith in reason —
and how that reaction shaped everything from nationalism
to existentialism to the modern self.

Berlin's central insight: the Romantics were the first to say
that there is no single answer to the question "how should I live?"
That authenticity matters more than correctness.
That the inner life is not reducible to reason.

This is the intellectual genealogy of everything I find interesting:
Nietzsche, Dostoevsky, Pessoa, Frost.
They are all, in some sense, Romantics.`,
    meta: { author: "Isaiah Berlin", year: "1999", genre: "Philosophy/History of Ideas" },
  },
  {
    id: "will-to-power",
    title: "Will to Power",
    subtitle: "Nietzsche → Geopolitics",
    type: "idea",
    constellation: "mind",
    connections: ["nietzsche", "animal-farm", "mans-search", "kissinger", "cruyff"],
    weight: 0.85,
    tooltip: "Will to Power · Nietzsche · self-overcoming, not domination",
    content: `Nietzsche's will to power is the most misread idea in philosophy.

It is not about domination. It is about self-overcoming.
The will to power is the drive to become more than you are —
to master yourself, to create, to grow.

But applied to geopolitics — through Kissinger's realism,
through great power competition, through the Belt and Road Initiative —
it becomes something else.

States, like individuals, have a will to power.
The question is whether that will is directed inward
(self-overcoming, development, culture)
or outward (domination, expansion, control).

The most powerful nations in history were the ones
that directed the will to power inward first.
Rome built roads. Britain built institutions.
The US built universities.

The will to power is not evil. Misdirected, it is.`,
    meta: { thinker: "Friedrich Nietzsche", lens: "Geopolitics" },
  },
  {
    id: "nietzsche",
    title: "Friedrich Nietzsche",
    subtitle: "God is dead. Now what?",
    type: "person",
    constellation: "mind",
    connections: ["will-to-power", "dostoevsky", "roots-romanticism", "mans-search"],
    weight: 0.75,
    tooltip: "Nietzsche · God is dead · the eternal recurrence",
    content: `"God is dead. God remains dead. And we have killed him."

Nietzsche was not celebrating. He was diagnosing.
The death of God — the collapse of the metaphysical framework
that gave Western civilization its meaning —
leaves a void. What fills it?

Nietzsche's answer: the Übermensch — not a superhuman,
but a human who creates their own values.
Who says yes to life, including its suffering.
Who wills the eternal recurrence.

The eternal recurrence: would you live your life again,
exactly as it was, infinitely? If yes, you are living well.
If no, change something.

I think about this when I'm at kilometer 8 of a 10k
and everything hurts. Would I do this again?
Yes. That is the answer.`,
    meta: { born: "1844", died: "1900", key_works: "Thus Spoke Zarathustra, Beyond Good and Evil" },
  },
  {
    id: "rousseau",
    title: "Jean-Jacques Rousseau",
    subtitle: "The Social Contract",
    type: "person",
    constellation: "mind",
    connections: ["adam-smith", "animal-farm", "roots-romanticism"],
    weight: 0.65,
    tooltip: "Rousseau · the social contract · man is born free",
    content: `"Man is born free, and everywhere he is in chains."

Rousseau's opening line of The Social Contract
is the most quoted and least understood sentence in political philosophy.

He was not saying civilization is bad.
He was asking: what makes political authority legitimate?
His answer: the general will — the collective interest of the community,
not the sum of individual interests.

The problem: who decides what the general will is?
History's answer: usually whoever has the most guns.

Rousseau is the intellectual father of both democracy and totalitarianism.
That is not a contradiction. It is a warning.

Read alongside Adam Smith: Smith says the invisible hand
coordinates individual interests. Rousseau says individual interests
must be subordinated to the general will.
The tension between them is the tension of modernity.`,
    meta: { born: "1712", died: "1778", key_works: "The Social Contract, Emile" },
  },
  {
    id: "adam-smith",
    title: "Adam Smith",
    subtitle: "The Wealth of Nations",
    type: "person",
    constellation: "mind",
    connections: ["rousseau", "will-to-power", "listening-grasshoppers"],
    weight: 0.65,
    tooltip: "Adam Smith · the invisible hand · not what you think",
    content: `Adam Smith is the most misquoted economist in history.

The "invisible hand" appears exactly once in The Wealth of Nations.
It is not the central thesis. It is a passing observation.

Smith's actual argument is more nuanced:
markets are powerful coordination mechanisms,
but they require institutions, trust, and moral foundations.
He wrote The Theory of Moral Sentiments before Wealth of Nations.
The moral theory comes first. The economics follows.

The version of Smith taught in MBA programs —
pure self-interest, deregulation, markets solve everything —
is a caricature. The real Smith worried about monopolies,
the power of merchants over legislators,
and the moral corruption of commercial society.

He was right to worry.`,
    meta: { born: "1723", died: "1790", key_works: "The Wealth of Nations, Theory of Moral Sentiments" },
  },
  {
    id: "dostoevsky",
    title: "Fyodor Dostoevsky",
    subtitle: "suffering as meaning",
    type: "person",
    constellation: "mind",
    connections: ["mans-search", "master-margarita", "nietzsche", "roots-romanticism"],
    weight: 0.7,
    tooltip: "Dostoevsky · suffering as meaning · the underground man",
    content: `Dostoevsky understood something Nietzsche only theorized:
what it feels like to be a human being in extremis.

He was sentenced to death, reprieved at the last moment,
sent to Siberia for four years. He came back and wrote
Crime and Punishment, The Idiot, The Brothers Karamazov.

His central insight: suffering is not an obstacle to meaning.
It is the path to it. Not because suffering is good,
but because it strips away everything false
and leaves only what is real.

The Grand Inquisitor chapter in The Brothers Karamazov
is the most devastating critique of institutional religion
ever written — by a deeply religious man.

"Beauty will save the world." — Prince Myshkin, The Idiot
He was wrong. But he was beautifully wrong.`,
    meta: { born: "1821", died: "1881", key_works: "Crime and Punishment, The Brothers Karamazov" },
  },
  {
    id: "kissinger",
    title: "Geopolitics",
    subtitle: "Kissinger, realism, great power competition",
    type: "idea",
    constellation: "mind",
    connections: ["will-to-power", "adam-smith", "rousseau"],
    weight: 0.6,
    tooltip: "Geopolitics · realism · the world as it is, not as we wish",
    content: `Realism in international relations: states act in their self-interest.
There is no world government. There is no enforcer.
The international system is anarchic.

Kissinger's contribution: the balance of power is not evil —
it is the mechanism by which catastrophic wars are prevented.
The Concert of Europe (1815-1914) was the longest peace
in European history. It was maintained by realpolitik.

The tension: realism is descriptively accurate
but normatively bankrupt. It tells you what states do,
not what they should do.

The question I keep returning to:
is there a geopolitics of meaning?
Can states, like individuals, have a will to power
directed toward self-overcoming rather than domination?

The Nordic countries suggest yes.
The 20th century suggests it is very hard.`,
  },
  {
    id: "frost-poem",
    title: "Stopping by Woods on a Snowy Evening",
    subtitle: "Robert Frost",
    type: "poem",
    constellation: "mind",
    connections: ["whoami", "manifesto", "pessoa-universe", "roots-romanticism"],
    weight: 0.8,
    tooltip: "Frost · stopping by woods · promises to keep",
    content: `Whose woods these are I think I know.
His house is in the village though;
He will not see me stopping here
To watch his woods fill up with snow.

My little horse must think it queer
To stop without a farmhouse near
Between the woods and frozen lake
The darkest evening of the year.

He gives his harness bells a shake
To ask if there is some mistake.
The only other sound's the sweep
Of easy wind and downy flake.

The woods are lovely, dark and deep,
But I have promises to keep,
And miles to go before I sleep,
And miles to go before I sleep.

— Robert Frost, 1922

The repetition of the last two lines is everything.
He stops. He wants to stay. He cannot.
The woods are lovely, dark and deep —
but there are promises.

I think about this poem when I want to stop running.`,
    meta: { author: "Robert Frost", year: "1922", collection: "New Hampshire" },
  },
];