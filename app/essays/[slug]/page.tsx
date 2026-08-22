import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import { getPublicEssays } from "@/lib/content";

interface EssayPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPublicEssays().map((essay) => ({ slug: essay.slug }));
}

export async function generateMetadata({ params }: EssayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const essay = getPublicEssays().find((item) => item.slug === slug);

  if (!essay) {
    return {
      title: "Essay not found — dropstone.in",
    };
  }

  return {
    title: `${essay.title} — dropstone.in`,
    description: essay.excerpt,
  };
}

export default async function EssayPage({ params }: EssayPageProps) {
  const { slug } = await params;
  const essay = getPublicEssays().find((item) => item.slug === slug);

  if (!essay) notFound();

  return (
    <SiteShell title={essay.title} subtitle={essay.subtitle} command={`cat essays/${essay.slug}.md`}>
      <article style={{ maxWidth: "720px" }}>
        <div
          style={{
            color: "var(--text-dim)",
            fontSize: "12px",
            marginBottom: "22px",
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <span>{essay.date}</span>
          <span>{essay.readingTime}</span>
          {essay.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>

        {essay.body.split("\n\n").map((paragraph) => (
          <p
            key={paragraph}
            style={{
              color: "var(--text-muted)",
              fontSize: "14px",
              lineHeight: 1.9,
              marginBottom: "18px",
              whiteSpace: "pre-line",
            }}
          >
            {paragraph}
          </p>
        ))}
      </article>
    </SiteShell>
  );
}