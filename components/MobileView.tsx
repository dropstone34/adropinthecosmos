"use client";

import { ContentNode } from "@/data/index";
import { allNodes } from "@/data/index";

interface MobileViewProps {
  onNodeOpen: (node: ContentNode) => void;
}

const constellations = [
  { id: "drop", label: "◈ DROP", color: "#7B68EE", desc: "the center" },
  { id: "build", label: "⬡ BUILD", color: "#7B68EE", desc: "what I make" },
  { id: "mind", label: "📖 MIND", color: "#FFD700", desc: "what I think" },
  { id: "cosmos", label: "✦ COSMOS", color: "#00D4FF", desc: "what I wonder" },
  { id: "arena", label: "◎ ARENA", color: "#00FF88", desc: "how I compete" },
];

export default function MobileView({ onNodeOpen }: MobileViewProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        padding: "24px 16px",
        fontFamily: "var(--font-mono)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "40px", paddingTop: "20px" }}>
        <svg
          width="40"
          height="50"
          viewBox="0 0 32 40"
          style={{ filter: "drop-shadow(0 0 12px rgba(123, 104, 238, 0.8))", marginBottom: "16px" }}
        >
          <path
            d="M16 2 C16 2, 28 18, 28 26 C28 33.2, 22.6 38, 16 38 C9.4 38, 4 33.2, 4 26 C4 18, 16 2, 16 2 Z"
            fill="rgba(123, 104, 238, 0.15)"
            stroke="#7B68EE"
            strokeWidth="1.5"
          />
        </svg>
        <h1 style={{ color: "var(--text-primary)", fontSize: "20px", fontWeight: 700, marginBottom: "4px" }}>
          Prakhar
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "12px" }}>a drop in the cosmos</p>
      </div>

      {constellations.map((c) => {
        const nodes = allNodes.filter((n) => n.constellation === c.id);
        return (
          <div key={c.id} className="mobile-card" style={{ marginBottom: "16px" }}>
            <div className="mobile-card-header">
              <span style={{ color: c.color, fontSize: "16px" }}>{c.label}</span>
              <span style={{ color: "var(--text-dim)", fontSize: "11px", marginLeft: "8px" }}>
                — {c.desc}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {nodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => onNodeOpen(node)}
                  style={{
                    background: "none",
                    border: "1px solid var(--border-dim)",
                    borderRadius: "6px",
                    padding: "10px 12px",
                    textAlign: "left",
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                    transition: "border-color 0.15s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.color; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-dim)"; }}
                >
                  <div style={{ color: "var(--text-primary)", fontSize: "13px", marginBottom: "2px" }}>
                    {node.title}
                  </div>
                  {node.subtitle && (
                    <div style={{ color: "var(--text-dim)", fontSize: "11px" }}>{node.subtitle}</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        );
      })}

      <div style={{ textAlign: "center", marginTop: "32px", paddingBottom: "32px", display: "flex", justifyContent: "center", gap: "24px" }}>
        <a href="/hire" style={{ color: "var(--accent-drop)", fontSize: "12px", textDecoration: "none", fontFamily: "var(--font-mono)" }}>[hire]</a>
        <a href="https://lichess.org/@/Dropstone34" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-muted)", fontSize: "12px", textDecoration: "none", fontFamily: "var(--font-mono)" }}>[chess]</a>
        <a href="/about" style={{ color: "var(--text-muted)", fontSize: "12px", textDecoration: "none", fontFamily: "var(--font-mono)" }}>[about]</a>
      </div>
    </div>
  );
}