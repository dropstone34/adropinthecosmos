"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ContentNode } from "@/data/index";

const StarField = dynamic(() => import("./StarField"), { ssr: false, loading: () => null });
const Terminal = dynamic(() => import("./Terminal"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        maxWidth: "560px",
        background: "#0F0F1A",
        border: "1px solid #2A2A4A",
        borderRadius: "8px",
        padding: "20px",
        minHeight: "200px",
        boxShadow: "0 0 20px rgba(123, 104, 238, 0.4)",
      }}
    >
      <div style={{ color: "#2A2A4A", fontSize: "12px", fontFamily: "monospace" }}>
        initializing terminal...
      </div>
    </div>
  ),
});

interface DesktopExperienceProps {
  onNodeOpen: (node: ContentNode) => void;
  onConstellationFocus: (c: string | null) => void;
  activeConstellation: string | null;
  onClose: () => void;
  lichessRating: number | null;
}

export default function DesktopExperience({
  onNodeOpen,
  onConstellationFocus,
  activeConstellation,
  onClose,
  lichessRating,
}: DesktopExperienceProps) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "var(--bg-primary)", overflow: "hidden" }}>
      <StarField onNodeClick={onNodeOpen} activeConstellation={activeConstellation} isMobile={false} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        <div style={{ marginBottom: "24px", pointerEvents: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <svg
            width="28"
            height="36"
            viewBox="0 0 32 40"
            style={{ filter: "drop-shadow(0 0 10px rgba(123, 104, 238, 0.7))", animation: "drop-fall 4s ease-in-out infinite" }}
          >
            <path
              d="M16 2 C16 2, 28 18, 28 26 C28 33.2, 22.6 38, 16 38 C9.4 38, 4 33.2, 4 26 C4 18, 16 2, 16 2 Z"
              fill="rgba(123, 104, 238, 0.1)"
              stroke="#7B68EE"
              strokeWidth="1.5"
            />
          </svg>
          <div style={{ color: "var(--text-dim)", fontSize: "10px", letterSpacing: "0.2em", fontFamily: "var(--font-mono)" }}>
            dropstone.in
          </div>
        </div>

        <section
          aria-label="Orientation"
          style={{
            pointerEvents: "all",
            width: "100%",
            maxWidth: "760px",
            marginBottom: "18px",
            padding: "0 20px",
          }}
        >
          <div
            style={{
              border: "1px solid var(--border-dim)",
              borderRadius: "12px",
              background: "rgba(10, 10, 15, 0.72)",
              padding: "16px",
              display: "grid",
              gap: "12px",
              backdropFilter: "blur(10px)",
            }}
          >
            <p style={{ color: "var(--text-primary)", fontSize: "13px", lineHeight: 1.7, textAlign: "center" }}>
              A living map of how I build systems, read to stay human, compete to stay honest, and look at the cosmos to stay small.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              {[
                { href: "/now", label: "now" },
                { href: "/essays", label: "essays" },
                { href: "/notes", label: "notes" },
                { href: "/about", label: "about" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    color: "var(--accent-drop)",
                    border: "1px solid var(--border-terminal)",
                    borderRadius: "999px",
                    padding: "5px 10px",
                    fontSize: "11px",
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div style={{ pointerEvents: "all", width: "100%", maxWidth: "560px", padding: "0 20px" }}>
          <Terminal onNodeOpen={onNodeOpen} onConstellationFocus={onConstellationFocus} />
        </div>
      </div>

      {activeConstellation && (
        <div style={{ position: "absolute", top: "24px", left: "24px", zIndex: 20, pointerEvents: "none" }}>
          <div style={{ color: "var(--text-dim)", fontSize: "11px", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "var(--accent-drop)" }}>◈</span>
            <span>{activeConstellation.toUpperCase()}</span>
            <button
              onClick={onClose}
              style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: "11px", pointerEvents: "all", padding: "0 4px" }}
            >
              [clear]
            </button>
          </div>
        </div>
      )}

      <div style={{ position: "absolute", bottom: "16px", left: "24px", right: "24px", zIndex: 20, display: "flex", justifyContent: "space-between", alignItems: "center", pointerEvents: "none" }}>
        <div style={{ color: "var(--text-dim)", fontSize: "10px", fontFamily: "var(--font-mono)", letterSpacing: "0.05em" }}>
          dropstone@cosmos:~ · {new Date().getFullYear()}
        </div>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          {lichessRating && (
            <span style={{ color: "var(--text-dim)", fontSize: "10px", fontFamily: "var(--font-mono)" }}>
              ♟ {lichessRating}
            </span>
          )}
          <Link href="/now" style={{ color: "var(--text-dim)", fontSize: "10px", fontFamily: "var(--font-mono)", textDecoration: "none", pointerEvents: "all", letterSpacing: "0.05em" }}>[now]</Link>
          <Link href="/essays" style={{ color: "var(--text-dim)", fontSize: "10px", fontFamily: "var(--font-mono)", textDecoration: "none", pointerEvents: "all", letterSpacing: "0.05em" }}>[essays]</Link>
          <Link href="/notes" style={{ color: "var(--text-dim)", fontSize: "10px", fontFamily: "var(--font-mono)", textDecoration: "none", pointerEvents: "all", letterSpacing: "0.05em" }}>[notes]</Link>
          <Link href="/hire" style={{ color: "var(--accent-drop)", fontSize: "10px", fontFamily: "var(--font-mono)", textDecoration: "none", pointerEvents: "all", letterSpacing: "0.05em" }}>[hire]</Link>
          <Link href="/about" style={{ color: "var(--text-dim)", fontSize: "10px", fontFamily: "var(--font-mono)", textDecoration: "none", pointerEvents: "all", letterSpacing: "0.05em" }}>[about]</Link>
        </div>
      </div>
    </div>
  );
}