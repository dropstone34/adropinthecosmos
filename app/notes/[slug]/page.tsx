import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import { getPublicNotes } from "@/lib/content";

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPublicNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getPublicNotes().find((item) => item.slug === slug);

  if (!note) {
    return {
      title: "Note not found — dropstone.in",
    };
  }

  return {
    title: `${note.title} — dropstone.in`,
    description: note.excerpt,
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getPublicNotes().find((item) => item.slug === slug);

  if (!note) notFound();

  return (
    <SiteShell title={note.title} subtitle={note.excerpt} command={`cat notes/${note.slug}.md`}>
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
          <span>{note.date}</span>
          {note.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>

        {note.body.split("\n\n").map((paragraph) => (
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