"use client";

import { useEffect, useRef, useState } from "react";
import { ContentNode } from "@/data/index";

interface ConstellationPanelProps {
  node: ContentNode | null;
  onClose: () => void;
  lichessRating?: number | null;
}

const TYPE_ICONS: Record<string, string> = {
  idea: "◈",
  book: "📖",
  person: "◉",
  project: "⬡",
  stat: "◎",
  poem: "✦",
  quote: "❝",
};

const CONSTELLATION_LABELS: Record<string, string> = {
  drop: "DROP",
  build: "BUILD",
  mind: "MIND",
  cosmos: "COSMOS",
  arena: "ARENA",
};

const CONSTELLATION_COLORS: Record<string, string> = {
  drop: "#7B68EE",
  build: "#7B68EE",
  mind: "#FFD700",
  cosmos: "#00D4FF",
  arena: "#00FF88",
};

// Pure display component — receives fully resolved props, no animation logic
function PanelContent({
  displayNode,
  isVisible,
  onClose,
  lichessRating,
}: {
  displayNode: ContentNode;
  isVisible: boolean;
  onClose: () => void;
  lichessRating?: number | null;
}) {
  const accentColor =
    displayNode.color ||
    CONSTELLATION_COLORS[displayNode.constellation] ||
    "#7B68EE";

  const icon = TYPE_ICONS[displayNode.type] || "◈";
  const constellationLabel = CONSTELLATION_LABELS[displayNode.constellation] || "";

  let content = displayNode.content || "";
  if (displayNode.id === "chess-rating" && lichessRating) {
    content = content.replace(
      "Rating: [live — fetched from Lichess API]",
      `Rating: ${lichessRating} (live)`
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: "min(480px, 90vw)",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        transform: isVisible ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        background: "var(--bg-terminal)",
        borderLeft: `1px solid ${accentColor}33`,
        boxShadow: `-20px 0 60px rgba(0,0,0,0.6)`,
      }}
    >
      {/* Accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, ${accentColor}, transparent)`,
          zIndex: 1,
        }}
      />

      {/* Header */}
      <div
        style={{
          padding: "20px 24px 16px",
          borderBottom: `1px solid ${accentColor}22`,
          background: "var(--bg-panel)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: "10px",
            color: "var(--text-dim)",
            letterSpacing: "0.15em",
            marginBottom: "8px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span style={{ color: accentColor }}>◈</span>
          <span>{constellationLabel}</span>
          <span>›</span>
          <span style={{ color: "var(--text-muted)" }}>{displayNode.type}</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "4px",
              }}
            >
              <span style={{ color: accentColor, fontSize: "16px" }}>{icon}</span>
              <h2
                style={{
                  color: "var(--text-primary)",
                  fontSize: "16px",
                  fontWeight: 700,
                  fontFamily: "var(--font-mono)",
                  lineHeight: 1.3,
                }}
              >
                {displayNode.title}
              </h2>
            </div>
            {displayNode.subtitle && (
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "12px",
                  paddingLeft: "26px",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {displayNode.subtitle}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "1px solid var(--border-terminal)",
              borderRadius: "4px",
              color: "var(--text-muted)",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              padding: "4px 8px",
              flexShrink: 0,
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = accentColor;
              e.currentTarget.style.color = accentColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-terminal)";
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            [×]
          </button>
        </div>

        {displayNode.meta && Object.keys(displayNode.meta).length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              marginTop: "12px",
              paddingLeft: "26px",
            }}
          >
            {Object.entries(displayNode.meta).map(([key, val]) => (
              <span
                key={key}
                style={{
                  background: `${accentColor}11`,
                  border: `1px solid ${accentColor}33`,
                  borderRadius: "3px",
                  color: accentColor,
                  fontSize: "10px",
                  padding: "2px 6px",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.03em",
                }}
              >
                {key}: {val}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
        {content ? (
          <pre
            style={{
              color: "var(--text-muted)",
              fontSize: "13px",
              lineHeight: "1.8",
              fontFamily: "var(--font-mono)",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {content.split("\n").map((line, i) => {
              if (line.startsWith('"') || line.startsWith("'")) {
                return (
                  <span key={i} style={{ color: "var(--text-primary)", display: "block" }}>
                    {line}
                  </span>
                );
              }
              if (line.startsWith("—") || line.startsWith("→")) {
                return (
                  <span key={i} style={{ color: accentColor, display: "block" }}>
                    {line}
                  </span>
                );
              }
              if (/^\d/.test(line.trim()) || line.includes("PR:") || line.includes("Rating:")) {
                return (
                  <span key={i} style={{ color: "var(--accent-green)", display: "block" }}>
                    {line}
                  </span>
                );
              }
              return (
                <span key={i} style={{ display: "block" }}>
                  {line}
                </span>
              );
            })}
          </pre>
        ) : (
          <p style={{ color: "var(--text-dim)", fontSize: "13px", fontFamily: "var(--font-mono)" }}>
            no content yet.
          </p>
        )}
      </div>

      {/* Footer */}
      {displayNode.connections.length > 0 && (
        <div
          style={{
            padding: "16px 24px",
            borderTop: `1px solid ${accentColor}22`,
            background: "var(--bg-panel)",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: "10px",
              color: "var(--text-dim)",
              letterSpacing: "0.1em",
              marginBottom: "8px",
            }}
          >
            CONNECTED TO
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {displayNode.connections.slice(0, 6).map((connId) => (
              <span
                key={connId}
                style={{
                  background: "var(--bg-terminal)",
                  border: "1px solid var(--border-terminal)",
                  borderRadius: "3px",
                  color: "var(--text-muted)",
                  fontSize: "11px",
                  padding: "3px 8px",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {connId.replace(/-/g, " ")}
              </span>
            ))}
            {displayNode.connections.length > 6 && (
              <span
                style={{
                  color: "var(--text-dim)",
                  fontSize: "11px",
                  padding: "3px 0",
                  fontFamily: "var(--font-mono)",
                }}
              >
                +{displayNode.connections.length - 6} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Wrapper handles animation state
export default function ConstellationPanel({
  node,
  onClose,
  lichessRating,
}: ConstellationPanelProps) {
  const [displayNode, setDisplayNode] = useState<ContentNode | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const t1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t2 = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (t1.current) clearTimeout(t1.current);
    if (t2.current) clearTimeout(t2.current);

    if (node) {
      // Show new node: update content first, then animate in after a tick
      t1.current = setTimeout(() => setDisplayNode(node), 0);
      t2.current = setTimeout(() => setIsVisible(true), 20);
    } else {
      // Hide: animate out first, then clear content
      t1.current = setTimeout(() => setIsVisible(false), 0);
      t2.current = setTimeout(() => setDisplayNode(null), 400);
    }

    return () => {
      if (t1.current) clearTimeout(t1.current);
      if (t2.current) clearTimeout(t2.current);
    };
  }, [node]);

  if (!displayNode) return null;

  return (
    <PanelContent
      displayNode={displayNode}
      isVisible={isVisible}
      onClose={onClose}
      lichessRating={lichessRating}
    />
  );
}