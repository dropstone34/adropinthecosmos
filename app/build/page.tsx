import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import ContentCard from "@/components/ContentCard";

export const metadata: Metadata = {
  title: "Build — dropstone.in",
  description: "Engineering work, projects, and technical direction from Prakhar.",
};

const projects = [
  {
    eyebrow: "work",
    title: "Qualcomm · Agentic AI + Bluetooth systems",
    href: "/about",
    excerpt:
      "Systems engineering at the edge: wireless protocols, device behavior, and the infrastructure needed for intelligent connected experiences.",
    meta: "embedded · wireless · ai",
    tags: ["qualcomm", "bluetooth", "agentic-ai"],
  },
  {
    eyebrow: "project",
    title: "dropstone.in",
    href: "/",
    excerpt:
      "A cosmic terminal portfolio built with Next.js, TypeScript, D3 force graphs, GSAP, Framer Motion, and live API signals.",
    meta: "next.js · vercel",
    tags: ["portfolio", "graph", "design"],
  },
  {
    eyebrow: "source",
    title: "GitHub",
    href: "https://github.com/dropstone34",
    excerpt:
      "Public code, experiments, and future artifacts will collect here as the site becomes a clearer body of work.",
    meta: "github.com/dropstone34",
    tags: ["code", "projects"],
  },
];

export default function BuildPage() {
  return (
    <SiteShell
      title="Build"
      subtitle="The engineering layer: systems, experiments, proof of work, and the public trail of what I make."
      command="ls build/"
    >
      <div style={{ display: "grid", gap: "14px" }}>
        {projects.map((project) => (
          <ContentCard
            key={project.title}
            eyebrow={project.eyebrow}
            title={project.title}
            href={project.href}
            excerpt={project.excerpt}
            meta={project.meta}
            tags={project.tags}
          />
        ))}
      </div>

      <section
        style={{
          borderTop: "1px solid var(--border-dim)",
          marginTop: "24px",
          paddingTop: "20px",
          color: "var(--text-muted)",
          fontSize: "13px",
          lineHeight: 1.8,
        }}
      >
        <p>
          Next direction: turn this page into a live project ledger with GitHub repositories,
          shipped notes, case studies, and technical essays connected back into the constellation.
        </p>
      </section>
    </SiteShell>
  );
}