import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import ContentCard from "@/components/ContentCard";
import { getPublicEssays } from "@/lib/content";

export const metadata: Metadata = {
  title: "Essays — dropstone.in",
  description: "Long-form writing on engineering, philosophy, systems, and meaning.",
};

export default function EssaysPage() {
  const essays = getPublicEssays();

  return (
    <SiteShell
      title="Essays"
      subtitle="Longer pieces: engineering notes, philosophical fragments, and attempts to make the chaos legible."
      command="ls essays/"
    >
      <div style={{ display: "grid", gap: "14px" }}>
        {essays.map((essay) => (
          <ContentCard
            key={essay.slug}
            eyebrow={essay.date}
            title={essay.title}
            href={`/essays/${essay.slug}`}
            excerpt={essay.excerpt}
            meta={essay.readingTime}
            tags={essay.tags}
          />
        ))}
      </div>
    </SiteShell>
  );
}