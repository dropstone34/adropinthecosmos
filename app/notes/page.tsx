import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import ContentCard from "@/components/ContentCard";
import { getPublicNotes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Notes — dropstone.in",
  description: "Shorter public notes from Prakhar's personal garden.",
};

export default function NotesPage() {
  const notes = getPublicNotes();

  return (
    <SiteShell
      title="Notes"
      subtitle="Shorter fragments from the garden: not every thought needs to become an essay."
      command="ls notes/"
    >
      <div style={{ display: "grid", gap: "14px" }}>
        {notes.map((note) => (
          <ContentCard
            key={note.slug}
            eyebrow={note.date}
            title={note.title}
            href={`/notes/${note.slug}`}
            excerpt={note.excerpt}
            tags={note.tags}
          />
        ))}
      </div>
    </SiteShell>
  );
}