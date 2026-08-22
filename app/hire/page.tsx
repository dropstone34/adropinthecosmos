import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hire Prakhar — Software Engineer",
  description:
    "Software Engineer at Qualcomm (Agentic AI & Bluetooth). Available for consulting, collaboration, and interesting problems.",
};

export default function HirePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        fontFamily: "var(--font-mono)",
      }}
    >
      <div style={{ width: "100%", maxWidth: "600px" }}>
        {/* Terminal window */}
        <div className="terminal-window">
          <div className="terminal-titlebar">
            <div className="terminal-dot terminal-dot-red" />
            <div className="terminal-dot terminal-dot-yellow" />
            <div className="terminal-dot terminal-dot-green" />
            <span className="terminal-title">hire.txt</span>
          </div>

          <div className="terminal-body" style={{ minHeight: "auto" }}>
            {/* Prompt */}
            <div className="terminal-line" style={{ marginBottom: "16px" }}>
              <span className="terminal-prompt">
                <span className="terminal-prompt-path">~/cosmos</span>
                {" ❯ "}
              </span>
              <span className="terminal-input">cat hire.txt</span>
            </div>

            {/* Content */}
            <div style={{ paddingLeft: "4px" }}>
              <div
                style={{
                  color: "var(--accent-drop)",
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "20px",
                  letterSpacing: "0.05em",
                }}
              >
              ◈ PRAKHAR — SOFTWARE ENGINEER
              <br />
              <span style={{ color: "var(--text-muted)", fontSize: "12px", fontWeight: 400 }}>a drop in the cosmos</span>
              </div>

              <div
                style={{
                  color: "var(--text-muted)",
                  fontSize: "13px",
                  lineHeight: "1.8",
                  marginBottom: "24px",
                }}
              >
                Currently: Software Engineer @ Qualcomm
                <br />
                Domain: Agentic AI + Bluetooth Systems
                <br />
                Stack: C/C++, embedded systems, wireless protocols, AI/ML at the edge
              </div>

              <div
                style={{
                  color: "var(--text-muted)",
                  fontSize: "13px",
                  lineHeight: "1.8",
                  marginBottom: "24px",
                }}
              >
                Open to:
                <br />
                <span style={{ color: "var(--accent-green)" }}>✓</span> Technical consulting
                <br />
                <span style={{ color: "var(--accent-green)" }}>✓</span> Interesting engineering problems
                <br />
                <span style={{ color: "var(--accent-green)" }}>✓</span> Writing / technical essays
                <br />
                <span style={{ color: "var(--accent-green)" }}>✓</span> Conversations about astrophysics, philosophy, chess
              </div>

              <div
                style={{
                  borderTop: "1px solid var(--border-terminal)",
                  paddingTop: "20px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    color: "var(--text-dim)",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    marginBottom: "12px",
                  }}
                >
                  CONTACT
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <a
                  href="mailto:dropstone34@gmail.com"
                    style={{
                      color: "var(--accent-drop)",
                      fontSize: "13px",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={{ color: "var(--text-dim)" }}>→</span>
                    dropstone34@gmail.com
                  </a>
                  <a
                    href="https://lichess.org/@/Dropstone34"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "13px",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={{ color: "var(--text-dim)" }}>→</span>
                    lichess.org/@/Dropstone34
                  </a>
                  <a
                    href="https://github.com/prakhar"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "13px",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={{ color: "var(--text-dim)" }}>→</span>
                    github.com/prakhar
                  </a>
                </div>
              </div>

              {/* Template note */}
              <div
                style={{
                  borderTop: "1px solid var(--border-dim)",
                  paddingTop: "16px",
                  color: "var(--text-dim)",
                  fontSize: "11px",
                  lineHeight: "1.7",
                }}
              >
                <span style={{ color: "var(--accent-drop)" }}>◈</span> Like this site?
                <br />
                Built with Next.js 15 + Canvas + d3-force.
                <br />
                Get the template →{" "}
                <a
                  href="https://gumroad.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--accent-drop)", textDecoration: "none" }}
                >
                  make your own drop
                </a>
              </div>
            </div>

            {/* Back link */}
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