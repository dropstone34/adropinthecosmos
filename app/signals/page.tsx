import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { getQuoteOfTheDay } from "@/lib/content";

export const metadata: Metadata = {
  title: "Signals — dropstone.in",
  description: "Live and planned signals from Prakhar's public operating system.",
};

const signalCards = [
  {
    name: "Lichess",
    status: "live",
    endpoint: "/api/lichess",
    detail: "Chess rating is already wired into the homepage.",
  },
  {
    name: "NASA APOD",
    status: "live",
    endpoint: "/api/nasa",
    detail: "Cosmic image/data endpoint already exists and can be surfaced more prominently.",
  },
  {
    name: "Spotify",
    status: "ready for credentials",
    endpoint: "/api/spotify/now-playing",
    detail:
      "Add Spotify client ID, client secret, and refresh token in Vercel to show now-playing data.",
  },
  {
    name: "Strava",
    status: "ready for credentials",
    endpoint: "/api/strava/latest",
    detail:
      "Add Strava client ID, client secret, and refresh token in Vercel to show latest run data.",
  },
  {
    name: "GitHub",
    status: "connected",
    endpoint: "https://github.com/dropstone34",
    detail: "Public profile is linked now. Repository activity can become dynamic next.",
  },
  {
    name: "LinkedIn",
    status: "connected",
    endpoint: "https://www.linkedin.com/in/prakhar34",
    detail: "Professional identity is linked for people who want the non-cosmic version.",
  },
];

export default function SignalsPage() {
  const quote = getQuoteOfTheDay();

  return (
    <SiteShell
      title="Signals"
      subtitle="The live layer: chess, cosmos, music, running, code, and public identity."
      command="status --signals"
    >
      <div style={{ display: "grid", gap: "16px" }}>
        <section
          style={{
            border: "1px solid var(--border-terminal)",
            borderRadius: "12px",
            padding: "20px",
            background: "rgba(0, 212, 255, 0.06)",
          }}
        >
          <div style={{ color: "var(--accent-cyan)", fontSize: "12px", marginBottom: "10px" }}>
            today
          </div>
          <p style={{ color: "var(--text-primary)", fontSize: "17px", lineHeight: 1.7 }}>
            “{quote.text}”
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "12px", marginTop: "10px" }}>
            — {quote.author}
          </p>
        </section>

        <section
          style={{
            display: "grid",
            gap: "12px",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          {signalCards.map((signal) => (
            <article
              key={signal.name}
              style={{
                border: "1px solid var(--border-dim)",
                borderRadius: "10px",
                padding: "16px",
                background: "rgba(15, 15, 26, 0.62)",
              }}
            >
              <div style={{ color: "var(--accent-drop)", fontSize: "11px", marginBottom: "8px" }}>
                {signal.status}
              </div>
              <h2 style={{ color: "var(--text-primary)", fontSize: "16px", marginBottom: "8px" }}>
                {signal.name}
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "12px", lineHeight: 1.7 }}>
                {signal.detail}
              </p>
              <p style={{ color: "var(--text-dim)", fontSize: "11px", marginTop: "12px" }}>
                {signal.endpoint}
              </p>
            </article>
          ))}
        </section>
      </div>
    </SiteShell>
  );
}