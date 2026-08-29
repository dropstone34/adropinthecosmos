import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Achievements — Prakhar · a drop in the cosmos",
  description:
    "10 achievements across inner and outer cosmos — chess, running, climbing, football, academia, gym, writing, and more. Live data from Lichess and Strava.",
};

const AchievementsHero = dynamic(
  () => import("@/components/achievements/AchievementsHero"),
  { ssr: false }
);

const BentoGrid = dynamic(
  () => import("@/components/achievements/BentoGrid"),
  { ssr: false }
);

export default function AchievementsPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse at top, rgba(124, 58, 237, 0.08) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(245, 158, 11, 0.06) 0%, transparent 50%), var(--bg-primary, #0A0A0F)",
        fontFamily: "var(--font-mono, monospace)",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Subtle grid background */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(123, 104, 238, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(123, 104, 238, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "rgba(10, 10, 15, 0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "12px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          style={{
            color: "var(--accent-drop, #7B68EE)",
            textDecoration: "none",
            fontSize: "12px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            fontFamily: "var(--font-mono, monospace)",
          }}
        >
          dropstone.in
        </Link>

        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          {[
            { href: "/", label: "cosmos" },
            { href: "/now", label: "now" },
            { href: "/essays", label: "essays" },
            { href: "/about", label: "about" },
            { href: "/hire", label: "hire" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                color: "rgba(255,255,255,0.35)",
                textDecoration: "none",
                fontSize: "11px",
                fontFamily: "var(--font-mono, monospace)",
                letterSpacing: "0.05em",
                transition: "color 0.15s ease",
              }}
            >
              [{item.label}]
            </Link>
          ))}
        </div>
      </nav>

      {/* Main content */}
      <main
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px 80px",
        }}
      >
        {/* Hero */}
        <AchievementsHero />

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)",
            marginBottom: "40px",
          }}
        />

        {/* Bento grid */}
        <BentoGrid />

        {/* Footer */}
        <div
          style={{
            marginTop: "64px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <Link
            href="/"
            style={{
              color: "rgba(255,255,255,0.25)",
              textDecoration: "none",
              fontSize: "12px",
              fontFamily: "var(--font-mono, monospace)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>←</span>
            <span>back to the cosmos</span>
          </Link>

          <div
            style={{
              fontSize: "11px",
              fontFamily: "var(--font-mono, monospace)",
              color: "rgba(255,255,255,0.15)",
              letterSpacing: "0.05em",
            }}
          >
            dropstone@cosmos:~/achievements · {new Date().getFullYear()}
          </div>
        </div>
      </main>
    </div>
  );
}