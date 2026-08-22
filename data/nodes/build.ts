import { ContentNode } from "../types";

export const buildNodes: ContentNode[] = [
  {
    id: "qualcomm",
    title: "Qualcomm",
    subtitle: "Software Engineer",
    type: "project",
    constellation: "build",
    connections: ["whoami", "agentic-ai", "bluetooth"],
    weight: 0.9,
    tooltip: "Qualcomm · Software Engineer · Agentic AI & Bluetooth",
    content: `Software Engineer @ Qualcomm

Working at the intersection of Agentic AI and Bluetooth systems.
Building the invisible infrastructure that connects devices,
enables intelligence, and powers the wireless world.

Qualcomm's chips are in billions of devices.
The work is embedded, real-time, and unforgiving.
There is no "undo" in firmware.

Stack: C/C++, embedded systems, wireless protocols,
AI/ML inference at the edge.`,
    meta: { company: "Qualcomm", role: "Software Engineer", domain: "Agentic AI & Bluetooth" },
  },
  {
    id: "agentic-ai",
    title: "Agentic AI",
    subtitle: "on-device intelligence",
    type: "idea",
    constellation: "build",
    connections: ["qualcomm", "bluetooth", "will-to-power"],
    weight: 0.7,
    tooltip: "Agentic AI · on-device intelligence · the future is local",
    content: `Agentic AI is AI that acts — not just responds.

The shift from reactive to agentic systems is the most
significant architectural change in AI since transformers.
An agent perceives, reasons, plans, and executes.

At Qualcomm, this means running these systems
on-device — no cloud, no latency, no privacy compromise.
The intelligence lives in your pocket.

The philosophical question: when does a system
stop being a tool and start being an agent?
Aristotle asked this about slaves. We ask it about chips.`,
  },
  {
    id: "bluetooth",
    title: "Bluetooth",
    subtitle: "wireless systems",
    type: "idea",
    constellation: "build",
    connections: ["qualcomm", "agentic-ai"],
    weight: 0.5,
    tooltip: "Bluetooth · wireless protocols · the invisible thread",
    content: `Bluetooth is named after Harald Bluetooth,
a 10th-century Danish king who united warring tribes.
The protocol does the same — connects disparate devices
into a coherent system.

Working on Bluetooth at Qualcomm means understanding
radio frequency, power management, protocol stacks,
and the physics of electromagnetic waves.

Every AirPod, every wireless keyboard, every medical device —
Bluetooth is the invisible thread.`,
  },
  {
    id: "this-site",
    title: "dropstone.in",
    subtitle: "this site — open source",
    type: "project",
    constellation: "build",
    connections: ["whoami", "cosmos-scale", "qualcomm"],
    weight: 0.6,
    tooltip: "dropstone.in · built with Next.js · get the template",
    content: `This site is itself a project.

Built with: Next.js 15, TypeScript, Tailwind CSS,
Framer Motion, GSAP, d3-force, Canvas API.

The star field is a force-directed graph.
Every star is a content node.
Every connection line is a relationship.
The layout is a map of how I think.

The terminal is not decoration — it is the interface.
The cosmos is not background — it is the context.

→ Get the template on Gumroad
→ View source on GitHub`,
    meta: { stack: "Next.js 15 + TypeScript", hosting: "Vercel", domain: "dropstone.in" },
  },
];