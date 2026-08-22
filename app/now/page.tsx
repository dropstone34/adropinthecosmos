import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import ContentCard from "@/components/ContentCard";
import { getLatestSignals, getQuoteOfTheDay } from "@/lib/content";

export const metadata: Metadata = {
  title: "Now — dropstone.in",
  description: "What Prakhar is building, reading, training, and thinking about now.",
};

export default function NowPage() {
  const quote = getQuoteOfTheDay();
  const signals = getLatestSignals();

  return (
    <SiteShell
      title="Now"
      subtitle="A current-state page: what I am building, reading, training, and turning into public signal."
      command="cat now.md"
    >
      <div style={{ display: "grid", gap: "18px" }}>
        <section
          style={{
            border: "1px solid var(--border-terminal)",
            borderRadius: "12px",
            padding: "22px",
            background: "rgba(123, 104, 238, 0.08)",
          }}
        >
          <div style={{ color: "var(--accent-gold)", fontSize: "12px", marginBottom: "10px" }}>
            quote of the day
          </div>
          <blockquote style={{ color: "var(--text-primary)", fontSize: "18px", lineHeight: 1.7 }}>
            “{quote.text}”
          </blockquote>
          <p style={{ color: "var(--text-muted)", fontSize: "12px", marginTop: "12px" }}>
            — {quote.author}
            {quote.source ? `, ${quote.source}` : ""}
          </p>
        </section>

        <section>
          <h2 style={{ color: "var(--accent-drop)", fontSize: "15px", marginBottom: "14px" }}>
            Current operating notes
          </h2>
          <div style={{ display: "grid", gap: "14px" }}>
            {signals.map((signal) => (
              <ContentCard
                key={`${signal.label}-${signal.title}`}
                eyebrow={signal.label}
                title={signal.title}
                href={signal.href}
                excerpt={signal.detail}
              />
            ))}
          </div>
        </section>

        <section
          style={{
            color: "var(--text-muted)",
            fontSize: "13px",
            lineHeight: 1.8,
            borderTop: "1px solid var(--border-dim)",
            paddingTop: "18px",
          }}
        >
          <p>
            This page is the bridge between the immersive constellation and the practical public
            website. Later it can pull live Spotify, Strava, reading, chess, and writing signals.
          </p>
        </section>
      </div>
    </SiteShell>
  );
}