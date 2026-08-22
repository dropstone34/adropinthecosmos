"use client";

import { useEffect, useState } from "react";
import { BOOT_MESSAGES } from "@/data/index";

interface BootSequenceProps {
  onComplete: () => void;
}

const ASCII_LOGO = `
 ██████╗ ██████╗  ██████╗ ██████╗ 
 ██╔══██╗██╔══██╗██╔═══██╗██╔══██╗
 ██║  ██║██████╔╝██║   ██║██████╔╝
 ██║  ██║██╔══██╗██║   ██║██╔═══╝ 
 ██████╔╝██║  ██║╚██████╔╝██║     
 ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝     
`;

type Phase = "logo" | "messages" | "fading" | "done";

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [phase, setPhase] = useState<Phase>("logo");
  const [taglineVisible, setTaglineVisible] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    // Logo is immediately visible — no fade delay
    const t1 = setTimeout(() => setTaglineVisible(true), 700);
    const t2 = setTimeout(() => setPhase("messages"), 1400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (phase !== "messages" || skipped) return;

    const totalMessages = BOOT_MESSAGES.length;
    let idx = 0;

    const interval = setInterval(() => {
      if (idx < totalMessages) {
        setMessages((prev) => [...prev, BOOT_MESSAGES[idx]]);
        setProgress(Math.round(((idx + 1) / totalMessages) * 100));
        idx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setPhase("fading");
          setTimeout(() => {
            setPhase("done");
            onComplete();
          }, 400);
        }, 500);
      }
    }, 220);

    return () => clearInterval(interval);
  }, [phase, skipped, onComplete]);

  const handleSkip = () => {
    setSkipped(true);
    setPhase("done");
    onComplete();
  };

  if (phase === "done") return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0A0A0F",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        opacity: phase === "fading" ? 0 : 1,
        transition: "opacity 0.4s ease",
      }}
    >
      {/* Subtle background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(123, 104, 238, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(123, 104, 238, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      {/* Logo section */}
      <div
        style={{
          textAlign: "center",
        }}
      >
        <pre
          style={{
            color: "#7B68EE",
            fontSize: "clamp(6px, 1.2vw, 13px)",
            lineHeight: 1.2,
            textAlign: "center",
            filter: "drop-shadow(0 0 20px rgba(123, 104, 238, 0.5))",
            whiteSpace: "pre",
          }}
        >
          {ASCII_LOGO}
        </pre>

        {/* Drop SVG */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "8px", marginBottom: "4px" }}>
          <svg
            width="32"
            height="40"
            viewBox="0 0 32 40"
            style={{
              filter: "drop-shadow(0 0 12px rgba(123, 104, 238, 0.8))",
              animation: "drop-fall 3s ease-in-out infinite",
            }}
          >
            <path
              d="M16 2 C16 2, 28 18, 28 26 C28 33.2, 22.6 38, 16 38 C9.4 38, 4 33.2, 4 26 C4 18, 16 2, 16 2 Z"
              fill="rgba(123, 104, 238, 0.08)"
              stroke="#7B68EE"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <div
          style={{
            color: "#4A4A6A",
            fontSize: "13px",
            marginTop: "24px",
            letterSpacing: "0.05em",
            opacity: taglineVisible ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        >
          <span style={{ color: "#7B68EE" }}>a drop</span>
          <span style={{ color: "#2A2A4A", margin: "0 8px" }}>·</span>
          <span style={{ color: "#4A4A6A" }}>in the cosmos</span>
        </div>
      </div>

      {/* Boot messages */}
      {phase === "messages" && (
        <div style={{ marginTop: "32px", width: "300px", animation: "fadeIn 0.3s ease forwards" }}>
          <div
            style={{
              marginBottom: "16px",
              minHeight: "180px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  color: i === messages.length - 1 ? "var(--text-muted)" : "var(--text-dim)",
                  fontSize: "11px",
                  lineHeight: "1.8",
                  fontFamily: "var(--font-mono)",
                  transition: "color 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    color: i === messages.length - 1 ? "var(--accent-green)" : "var(--text-dim)",
                    fontSize: "10px",
                  }}
                >
                  {i === messages.length - 1 ? "▶" : "✓"}
                </span>
                {msg}
              </div>
            ))}
          </div>

          <div style={{ height: "2px", background: "#2A2A4A", borderRadius: "1px", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                background: "#7B68EE",
                borderRadius: "1px",
                boxShadow: "0 0 8px #7B68EE",
                transition: "width 0.1s linear",
                width: `${progress}%`,
              }}
            />
          </div>
          <div style={{ color: "#4A4A6A", fontSize: "11px", marginTop: "8px", textAlign: "center" }}>
            {progress < 100 ? `loading... ${progress}%` : "all systems nominal."}
          </div>
        </div>
      )}

      {/* Skip */}
      <button
        onClick={handleSkip}
        style={{
          position: "absolute",
          bottom: "32px",
          right: "32px",
          background: "none",
          border: "none",
          color: "#2A2A4A",
          fontSize: "11px",
          cursor: "pointer",
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "0.05em",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = "#4A4A6A"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "#2A2A4A"; }}
      >
        [skip →]
      </button>
    </div>
  );
}