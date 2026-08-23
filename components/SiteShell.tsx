import Link from "next/link";
import type { ReactNode } from "react";
import CliBar from "@/components/CliBar";

const navItems = [
  { href: "/", label: "cosmos" },
  { href: "/now", label: "now" },
  { href: "/build", label: "build" },
  { href: "/signals", label: "signals" },
  { href: "/essays", label: "essays" },
  { href: "/notes", label: "notes" },
  { href: "/about", label: "about" },
  { href: "/hire", label: "hire" },
];

interface SiteShellProps {
  title: string;
  subtitle?: string;
  command: string;
  children: ReactNode;
}

function deriveCliPath(command: string): string {
  if (command.startsWith("cat essays/")) {
    const slug = command.replace("cat essays/", "").replace(".md", "");
    return `~/essays/${slug}`;
  }
  if (command.startsWith("cat notes/")) {
    const slug = command.replace("cat notes/", "").replace(".md", "");
    return `~/notes/${slug}`;
  }
  if (command.startsWith("cat ")) {
    return "~";
  }
  return "~";
}

export default function SiteShell({ title, subtitle, command, children }: SiteShellProps) {
  const cliPath = deriveCliPath(command);

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(123, 104, 238, 0.14), transparent 32rem), var(--bg-primary)",
        padding: "32px 18px",
        fontFamily: "var(--font-mono)",
      }}
    >
      <div style={{ width: "100%", maxWidth: "920px", margin: "0 auto" }}>
        <nav
          aria-label="Primary"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            alignItems: "center",
            marginBottom: "18px",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            style={{
              color: "var(--accent-drop)",
              textDecoration: "none",
              fontSize: "12px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            dropstone.in
          </Link>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  fontSize: "12px",
                }}
              >
                [{item.label}]
              </Link>
            ))}
          </div>
        </nav>

        <CliBar initialPath={cliPath} />

        <section className="terminal-window">
          <div className="terminal-titlebar">
            <div className="terminal-dot terminal-dot-red" />
            <div className="terminal-dot terminal-dot-yellow" />
            <div className="terminal-dot terminal-dot-green" />
            <span className="terminal-title">{command}</span>
          </div>

          <div className="terminal-body" style={{ minHeight: "auto", maxHeight: "none" }}>
            <div className="terminal-line" style={{ marginBottom: "24px" }}>
              <span className="terminal-prompt">
                <span className="terminal-prompt-path">~/cosmos</span>
                {" > "}
              </span>
              <span className="terminal-input">{command}</span>
            </div>

            <header style={{ marginBottom: "32px" }}>
              <p
                style={{
                  color: "var(--accent-drop)",
                  fontSize: "12px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                signal acquired
              </p>
              <h1
                style={{
                  color: "var(--text-primary)",
                  fontSize: "clamp(28px, 5vw, 52px)",
                  lineHeight: 1.05,
                  marginBottom: "12px",
                  letterSpacing: "-0.05em",
                }}
              >
                {title}
              </h1>
              {subtitle ? (
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "14px",
                    lineHeight: 1.8,
                    maxWidth: "720px",
                  }}
                >
                  {subtitle}
                </p>
              ) : null}
            </header>

            {children}
          </div>
        </section>
      </div>
    </main>
  );
}