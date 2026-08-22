import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Prakhar — Software Engineer · a drop in the cosmos",
  description:
    "Software Engineer at Qualcomm. Chess player, runner, reader. Interested in astrophysics, philosophy, geopolitics, and the beautiful game.",
};

export default function AboutPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "40px 20px",
        fontFamily: "var(--font-mono)",
      }}
    >
      <div style={{ width: "100%", maxWidth: "680px" }}>
        <div className="terminal-window">
          <div className="terminal-titlebar">
            <div className="terminal-dot terminal-dot-red" />
            <div className="terminal-dot terminal-dot-yellow" />
            <div className="terminal-dot terminal-dot-green" />
            <span className="terminal-title">README.md</span>
          </div>

          <div className="terminal-body" style={{ minHeight: "auto" }}>
            {/* Prompt */}
            <div className="terminal-line" style={{ marginBottom: "20px" }}>
              <span className="terminal-prompt">
                <span className="terminal-prompt-path">~/cosmos</span>
                {" ❯ "}
              </span>
              <span className="terminal-input">cat README.md</span>
            </div>

            <div style={{ paddingLeft: "4px" }}>
              {/* Name + tagline */}
              <div style={{ marginBottom: "28px" }}>
                <div
                  style={{
                    color: "var(--accent-drop)",
                    fontSize: "18px",
                    fontWeight: 700,
                    marginBottom: "6px",
                    letterSpacing: "0.03em",
                  }}
                >
                  # Prakhar
                </div>
                <div style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                  a drop in the cosmos.
                </div>
              </div>

              {/* Section: Work */}
              <section style={{ marginBottom: "28px" }}>
                <div
                  style={{
                    color: "var(--accent-drop)",
                    fontSize: "13px",
                    fontWeight: 700,
                    marginBottom: "10px",
                    letterSpacing: "0.05em",
                  }}
                >
                  ## WORK
                </div>
                <div
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "13px",
                    lineHeight: "1.8",
                  }}
                >
                  Software Engineer at{" "}
                  <span style={{ color: "var(--text-primary)" }}>Qualcomm</span>,
                  working on Agentic AI and Bluetooth systems.
                  <br />
                  Building the invisible infrastructure that connects devices,
                  enables intelligence, and powers the wireless world.
                  <br />
                  <br />
                  Stack: C/C++, embedded systems, wireless protocols, AI/ML inference at the edge.
                </div>
              </section>

              {/* Section: Arena */}
              <section style={{ marginBottom: "28px" }}>
                <div
                  style={{
                    color: "var(--accent-gold)",
                    fontSize: "13px",
                    fontWeight: 700,
                    marginBottom: "10px",
                    letterSpacing: "0.05em",
                  }}
                >
                  ## ARENA
                </div>
                <div
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "13px",
                    lineHeight: "1.8",
                  }}
                >
                  <span style={{ color: "var(--accent-gold)" }}>♟ Chess</span> —{" "}
                  <a
                    href="https://lichess.org/@/Dropstone34"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--text-primary)", textDecoration: "none" }}
                  >
                    Lichess: Dropstone34
                  </a>
                  . Favorite player: Daniil Dubov (chess as jazz).
                  <br />
                  <span style={{ color: "var(--accent-gold)" }}>⚽ Football</span> — Cruyff,
                  tiki-taka, total football. The geometry of the game.
                  <br />
                  <span style={{ color: "var(--accent-red)" }}>🏎 F1</span> — Max Verstappen
                  + Ferrari. The calculator and the romantics.
                  <br />
                  <span style={{ color: "var(--accent-green)" }}>🏃 Running</span> — 10k PR:
                  48:00. Miles to go before I sleep.
                </div>
              </section>

              {/* Section: Mind */}
              <section style={{ marginBottom: "28px" }}>
                <div
                  style={{
                    color: "var(--accent-gold)",
                    fontSize: "13px",
                    fontWeight: 700,
                    marginBottom: "10px",
                    letterSpacing: "0.05em",
                  }}
                >
                  ## MIND
                </div>
                <div
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "13px",
                    lineHeight: "1.8",
                  }}
                >
                  <span style={{ color: "var(--text-primary)" }}>Books:</span> Man&apos;s
                  Search for Meaning, Animal Farm, The Master and Margarita, A Little Larger
                  Than the Entire Universe (Pessoa), Listening to Grasshoppers, Roots of
                  Romanticism.
                  <br />
                  <br />
                  <span style={{ color: "var(--text-primary)" }}>Philosophy:</span> Nietzsche
                  (Will to Power as self-overcoming, not domination), Dostoevsky (suffering as
                  meaning), Rousseau (the social contract), Adam Smith (the real one, not the
                  MBA caricature), Isaiah Berlin (the counter-enlightenment).
                  <br />
                  <br />
                  <span style={{ color: "var(--text-primary)" }}>Poem:</span> Stopping by
                  Woods on a Snowy Evening — Frost. The repetition of the last two lines is
                  everything.
                </div>
              </section>

              {/* Section: Cosmos */}
              <section style={{ marginBottom: "28px" }}>
                <div
                  style={{
                    color: "var(--accent-cyan)",
                    fontSize: "13px",
                    fontWeight: 700,
                    marginBottom: "10px",
                    letterSpacing: "0.05em",
                  }}
                >
                  ## COSMOS
                </div>
                <div
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "13px",
                    lineHeight: "1.8",
                  }}
                >
                  The universe is 13.8 billion years old. You have ~80.
                  <br />
                  <br />
                  Interested in: astrophysics, the Fermi Paradox, the scale of everything,
                  Vedic cosmology in conversation with modern physics.
                  <br />
                  <br />
                  <span style={{ color: "var(--text-primary)" }}>
                    &quot;We are a way for the cosmos to know itself.&quot;
                  </span>
                  <br />
                  — Carl Sagan
                </div>
              </section>

              {/* Section: This site */}
              <section style={{ marginBottom: "28px" }}>
                <div
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "13px",
                    fontWeight: 700,
                    marginBottom: "10px",
                    letterSpacing: "0.05em",
                  }}
                >
                  ## THIS SITE
                </div>
                <div
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "13px",
                    lineHeight: "1.8",
                  }}
                >
                  Built with Next.js 15, TypeScript, Tailwind CSS, Canvas API, d3-force,
                  Framer Motion, GSAP.
                  <br />
                  The star field is a force-directed graph. Every star is a content node.
                  Every connection line is a relationship.
                  <br />
                  <br />
                  <a
                    href="https://gumroad.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--accent-drop)", textDecoration: "none" }}
                  >
                    → Get the template (make your own drop)
                  </a>
                </div>
              </section>

              {/* Links */}
              <div
                style={{
                  borderTop: "1px solid var(--border-terminal)",
                  paddingTop: "20px",
                  display: "flex",
                  gap: "20px",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="https://lichess.org/@/Dropstone34"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--accent-gold)",
                    fontSize: "12px",
                    textDecoration: "none",
                  }}
                >
                  [lichess]
                </a>
                <a
                  href="mailto:dropstone34@gmail.com"
                  style={{
                    color: "var(--accent-drop)",
                    fontSize: "12px",
                    textDecoration: "none",
                  }}
                >
                  [email]
                </a>
                <a
                  href="https://github.com/prakhar"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "12px",
                    textDecoration: "none",
                  }}
                >
                  [github]
                </a>
                <a
                  href="https://substack.com/@dropstone"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "12px",
                    textDecoration: "none",
                  }}
                >
                  [substack]
                </a>
                <Link
                  href="/hire"
                  style={{
                    color: "var(--accent-drop)",
                    fontSize: "12px",
                    textDecoration: "none",
                  }}
                >
                  [hire]
                </Link>
              </div>
            </div>

            {/* Back */}
            <div
              style={{
                marginTop: "24px",
                paddingTop: "16px",
                borderTop: "1px solid var(--border-dim)",
              }}
            >
              <Link
                href="/"
                style={{
                  color: "var(--text-dim)",
                  fontSize: "12px",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>←</span>
                <span>back to the cosmos</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}