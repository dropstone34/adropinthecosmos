import { ContentNode } from "../types";

export const arenaNodes: ContentNode[] = [
  {
    id: "chess-rating",
    title: "Chess",
    subtitle: "Lichess: Dropstone34",
    type: "stat",
    constellation: "arena",
    connections: ["whoami", "dubov", "chess-philosophy", "cruyff"],
    weight: 0.85,
    tooltip: "Chess · Lichess: Dropstone34 · live rating",
    color: "#FFD700",
    content: `Chess is the game I keep coming back to.

Lichess: Dropstone34
Rating: [live — fetched from Lichess API]

Chess teaches you things no other game does:
- Every position has a truth. Find it.
- Tactics are local. Strategy is global.
- The endgame is where character is revealed.
- Losing is information.

I play mostly rapid and blitz.
I study openings but I love the middlegame —
the moment when the position becomes unique,
when the book ends and you are alone with the board.`,
    meta: { platform: "Lichess", username: "Dropstone34" },
  },
  {
    id: "dubov",
    title: "Daniil Dubov",
    subtitle: "chess as jazz",
    type: "person",
    constellation: "arena",
    connections: ["chess-rating", "chess-philosophy"],
    weight: 0.65,
    tooltip: "Daniil Dubov · chess as jazz · structured chaos",
    color: "#FFD700",
    content: `Daniil Dubov plays chess like jazz.

He is Carlsen's second, a world-class player in his own right,
and the most creative chess mind of his generation.

Dubov's style: sacrifice material for activity.
Give up the pawn, get the initiative.
Give up the piece, get the attack.
The position is always alive, always dangerous.

"I don't calculate. I feel."

This is the opposite of how chess is supposed to work.
Chess is supposed to be calculation, precision, logic.
Dubov plays it like improvisation — structured chaos,
themes and variations, the unexpected move
that is somehow the only move.

I try to play like this. I mostly fail.
But the attempt is the point.`,
    meta: { nationality: "Russian", peak_rating: "2720+", style: "Tactical/Creative" },
  },
  {
    id: "chess-philosophy",
    title: "Chess Philosophy",
    subtitle: "the game as metaphor",
    type: "idea",
    constellation: "arena",
    connections: ["chess-rating", "dubov", "cruyff", "will-to-power"],
    weight: 0.6,
    tooltip: "Chess as metaphor · the board as the world",
    color: "#FFD700",
    content: `Chess is a complete world.

It has geography (the board), resources (pieces),
strategy (plans), tactics (combinations),
and an endgame (the inevitable conclusion).

Every chess game is a compressed history of a conflict.
Opening: the establishment of positions.
Middlegame: the struggle for advantage.
Endgame: the conversion of advantage to victory.

Kasparov said: "Chess is life in miniature."
He was right, but he undersold it.
Chess is also philosophy in miniature.

The question of whether to sacrifice material for initiative
is the question of whether to sacrifice security for freedom.
The question of when to simplify is the question of
when to accept what you have.
The question of the endgame is the question of legacy.`,
  },
  {
    id: "cruyff",
    title: "Johan Cruyff",
    subtitle: "total football",
    type: "person",
    constellation: "arena",
    connections: ["whoami", "chess-philosophy", "will-to-power", "tiki-taka"],
    weight: 0.85,
    tooltip: "Johan Cruyff · total football · it is not about the ball",
    color: "#FFD700",
    content: `"It is not about the ball. It is about the space."

Johan Cruyff changed football the way Einstein changed physics.
He did not just play differently — he thought differently.

Total football: every player can play every position.
The team is a fluid system, not a fixed structure.
Space is the resource. Movement creates space.
The ball is just the tool.

Cruyff's Ajax won three consecutive European Cups (1971-73).
His Barcelona won the first La Liga in 14 years (1991).
His ideas became tiki-taka, became Guardiola's Barcelona,
became the dominant football philosophy of the 21st century.

"Quality without results is pointless.
Results without quality is boring."

He was also a philosopher. He just happened to express it
through football.`,
    meta: { nationality: "Dutch", clubs: "Ajax, Barcelona", legacy: "Total Football, tiki-taka" },
  },
  {
    id: "tiki-taka",
    title: "Tiki-Taka",
    subtitle: "the geometry of the game",
    type: "idea",
    constellation: "arena",
    connections: ["cruyff", "chess-philosophy"],
    weight: 0.65,
    tooltip: "Tiki-taka · possession as pressure · the geometry of football",
    color: "#FFD700",
    content: `Tiki-taka is not about keeping the ball.
It is about making the opponent run.

The geometry: if you have the ball, the opponent must chase.
If they chase, they create space. If they create space, you exploit it.
The ball moves faster than any player can run.
Therefore: move the ball, not the players.

Guardiola's Barcelona (2008-2012) was the apex.
Messi, Xavi, Iniesta, Busquets — a system so perfect
it looked effortless. It was not effortless.
It was the result of thousands of hours of positional training.

The philosophical point: tiki-taka is a collective intelligence.
No individual is more important than the system.
The system creates the individual's greatness.

This is also true of good engineering teams.`,
  },
  {
    id: "f1-racing",
    title: "Formula 1",
    subtitle: "Max Verstappen + Ferrari",
    type: "stat",
    constellation: "arena",
    connections: ["chess-philosophy", "cruyff"],
    weight: 0.7,
    tooltip: "F1 · Max Verstappen · Ferrari · live standings",
    color: "#FF4444",
    content: `Formula 1 is chess at 300km/h.

The strategy: tire compounds, pit windows, undercuts, overcuts.
The physics: downforce, drag, tire degradation, fuel load.
The human element: the driver who can push the car
beyond its theoretical limits.

Max Verstappen: the calculator. Precise, relentless, cold.
He does not make mistakes. He makes the car do things
it is not supposed to do.

Ferrari: the romantics. The most storied team in F1.
The red cars, the Scuderia, the tifosi.
They win beautifully and lose dramatically.
They are the most human team in the most technical sport.

The tension between Verstappen's precision and Ferrari's passion
is the tension between the engineer and the artist.
I contain both.`,
    meta: { favorite_driver: "Max Verstappen", favorite_team: "Ferrari" },
  },
  {
    id: "running",
    title: "Running",
    subtitle: "10k PR: 48:00",
    type: "stat",
    constellation: "arena",
    connections: ["whoami", "manifesto", "frost-poem"],
    weight: 0.75,
    tooltip: "Running · 10k PR: 48:00 · miles to go before I sleep",
    color: "#00FF88",
    content: `Running is the most honest sport.

There is no equipment advantage. No team to carry you.
No referee to blame. Just you and the distance
and the question of whether you will keep going.

10k PR: 48:00 (4:48/km pace)

Running teaches you the same thing every time:
the first 3km are a lie (you feel great).
The middle 4km are the truth (you feel terrible).
The last 3km are a choice (you decide who you are).

I run in the morning, before the day has opinions.
The city is quiet. The air is cool.
The only sound is footfall and breath.

"The woods are lovely, dark and deep,
But I have promises to keep,
And miles to go before I sleep."

Frost understood.`,
    meta: { "10k_pr": "48:00", "pace": "4:48/km", "best_time": "morning" },
  },
];