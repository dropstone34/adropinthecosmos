"use client";

import { useState, useRef, useCallback } from "react";
import { ContentNode, allNodes } from "@/data/index";
import { recordInterest, getSignal, SiteSignal, Constellation } from "@/lib/site-intelligence";
import { resolvePath, lsPath, getNodeForPath, getConstellationForPath, isLeafPath, getPathColor } from "@/lib/cli-fs";
import { playConstellationEntry, playNodeEntry, playNavigateBack, playError } from "@/lib/sounds";

interface MobileViewProps {
  onNodeOpen: (node: ContentNode) => void;
}

const CONSTELLATIONS: {
  id: Constellation;
  label: string;
  symbol: string;
  color: string;
  desc: string;
}[] = [
  { id: "drop", label: "DROP", symbol: "◈", color: "#7B68EE", desc: "the center" },
  { id: "build", label: "BUILD", symbol: "⬡", color: "#7B68EE", desc: "what I make" },
  { id: "mind", label: "MIND", symbol: "◉", color: "#FFD700", desc: "what I think" },
  { id: "cosmos", label: "COSMOS", symbol: "✦", color: "#00D4FF", desc: "what I wonder" },
  { id: "arena", label: "ARENA", symbol: "◎", color: "#00FF88", desc: "how I compete" },
];

function nodeVariant(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) & 0xffff;
  return h % 4;
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

function HazeParticle({ index }: { index: number }) {
  const w = 40 + (index * 37) % 100;
  const h = 20 + (index * 23) % 50;
  const left = (index * 19) % 90;
  const top = (index * 31) % 85;
  const dur = 8 + (index % 6) * 2;
  const delay = (index % 4) * 1.5;
  const opacity = 0.03 + (index % 5) * 0.012;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: `${w}px`,
        height: `${h}px`,
        borderRadius: "50%",
        background: `radial-gradient(ellipse, rgba(196, 149, 106, ${opacity}), transparent 70%)`,
        left: `${left}%`,
        top: `${top}%`,
        animation: `tobacco-drift ${dur}s ease-in-out ${delay}s infinite alternate`,
        pointerEvents: "none",
      }}
    />
  );
}

function SignalTrace({ signal }: { signal: SiteSignal }) {
  const maxVal = Math.max(...Object.values(signal.vector), 1);
  return (
    <div
      style={{
        marginBottom: "24px",
        padding: "12px 14px",
        background: "rgba(196, 149, 106, 0.03)",
        border: "1px solid rgba(196, 149, 106, 0.1)",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          color: "var(--accent-tobacco)",
          fontSize: "9px",
          letterSpacing: "0.14em",
          marginBottom: "8px",
          opacity: 0.6,
        }}
      >
        SIGNAL TRACE
      </div>
      <div style={{ display: "flex", gap: "4px", alignItems: "flex-end", height: "24px" }}>
        {CONSTELLATIONS.map((c) => {
          const val = signal.vector[c.id] || 0;
          const barH = Math.max(2, (val / maxVal) * 24);
          return (
            <div
              key={c.id}
              title={`${c.label}: ${val}`}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                height: "24px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: `${barH}px`,
                  background: c.color,
                  opacity: val > 0 ? 0.65 : 0.12,
                  borderRadius: "2px 2px 0 0",
                  transition: "height 0.5s ease, opacity 0.5s ease",
                }}
              />
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: "4px", marginTop: "4px" }}>
        {CONSTELLATIONS.map((c) => (
          <div
            key={c.id}
            style={{
              flex: 1,
              textAlign: "center",
              color: "var(--text-dim)",
              fontSize: "7px",
              letterSpacing: "0.05em",
            }}
          >
            {c.symbol}
          </div>
        ))}
      </div>
    </div>
  );
}

interface CliOutputLine {
  id: number;
  text: string;
  isError?: boolean;
}

let cliLineId = 0;

function MobileCliBar({
  cwd,
  setCwd,
  onNodeOpen,
  onConstellationFocus,
}: {
  cwd: string;
  setCwd: (p: string) => void;
  onNodeOpen: (node: ContentNode) => void;
  onConstellationFocus: (c: Constellation | null) => void;
}) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<CliOutputLine[]>([]);
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const emit = useCallback((text: string, isError = false) => {
    setOutput((prev) => [...prev.slice(-5), { id: cliLineId++, text, isError }]);
  }, []);

  const execute = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      const [cmd, ...args] = trimmed.split(/\s+/);
      const cmdLower = cmd.toLowerCase();

      if (cmdLower === "cd") {
        const target = args.join(" ") || "~";

        if (target === "~" || target === "/") {
          setCwd("~");
          onConstellationFocus(null);
          playNavigateBack();
          emit("~");
          return;
        }

        const result = resolvePath(cwd, target);
        if (result.error) {
          playError();
          emit(`cd: ${result.error}`, true);
          return;
        }

        const newCwd = result.path;
        setCwd(newCwd);

        const constellation = getConstellationForPath(newCwd);
        if (constellation) onConstellationFocus(constellation as Constellation);

        if (isLeafPath(newCwd)) {
          const node = getNodeForPath(newCwd);
          if (node) {
            const c = node.constellation as "drop" | "build" | "mind" | "cosmos" | "arena";
            playNodeEntry(c);
            emit(newCwd);
            onNodeOpen(node);
          }
        } else if (constellation) {
          playConstellationEntry(constellation as "drop" | "build" | "mind" | "cosmos" | "arena");
          const entries = lsPath(newCwd);
          emit(newCwd);
          entries.slice(0, 5).forEach((e) => emit(`  ${e.name}`));
        } else {
          playNavigateBack();
          emit(newCwd);
        }
        return;
      }

      if (cmdLower === "ls") {
        const target = args[0] ? resolvePath(cwd, args[0]).path : cwd;
        const entries = lsPath(target);
        if (entries.length === 0) {
          emit("(empty)");
        } else {
          entries.slice(0, 8).forEach((e) => emit(`  ${e.type === "dir" ? "/" : " "}${e.name}`));
        }
        return;
      }

      if (cmdLower === "pwd") {
        emit(cwd);
        return;
      }

      if (cmdLower === "exit") {
        setCwd("~");
        onConstellationFocus(null);
        playNavigateBack();
        emit("~");
        return;
      }

      emit(`not found: ${trimmed}`, true);
    },
    [cwd, setCwd, emit, onNodeOpen, onConstellationFocus]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        execute(input);
        setInput("");
      }
      if (e.key === "Escape") setExpanded(false);
    },
    [input, execute]
  );

  const pathColor = getPathColor(cwd);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        fontFamily: "var(--font-mono)",
        fontSize: "12px",
      }}
    >
      {expanded && output.length > 0 && (
        <div
          style={{
            background: "rgba(10, 10, 15, 0.96)",
            borderTop: "1px solid var(--border-terminal)",
            padding: "8px 16px",
            maxHeight: "100px",
            overflowY: "auto",
          }}
        >
          {output.map((line) => (
            <div
              key={line.id}
              style={{
                color: line.isError ? "var(--accent-red)" : "var(--text-muted)",
                lineHeight: 1.6,
                whiteSpace: "pre",
              }}
            >
              {line.text}
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          background: "rgba(10, 10, 15, 0.97)",
          borderTop: "1px solid var(--border-terminal)",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
        onClick={() => {
          setExpanded(true);
          inputRef.current?.focus();
        }}
      >
        <span style={{ color: pathColor, whiteSpace: "nowrap", userSelect: "none", fontSize: "11px" }}>
          {cwd} ❯
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setExpanded(true)}
          placeholder={expanded ? "" : "cd · ls · exit"}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--text-primary)",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            flex: 1,
            caretColor: "var(--accent-drop)",
          }}
        />
        <button
          onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v); }}
          style={{
            background: "none",
            border: "none",
            color: "var(--text-dim)",
            fontSize: "10px",
            cursor: "pointer",
            padding: "0 4px",
            fontFamily: "var(--font-mono)",
          }}
        >
          {expanded ? "▼" : "▲"}
        </button>
      </div>
    </div>
  );
}

export default function MobileView({ onNodeOpen }: MobileViewProps) {
  const [signal, setSignal] = useState<SiteSignal | null>(() => {
    if (typeof window === "undefined") return null;
    return getSignal();
  });
  const [activeFilter, setActiveFilter] = useState<Constellation | null>(null);
  const [cwd, setCwd] = useState("~/cosmos");
  const [activeConstellation, setActiveConstellation] = useState<Constellation | null>(null);

  const handleNodeOpen = (node: ContentNode) => {
    recordInterest(node.constellation as Constellation);
    setSignal(getSignal());
    onNodeOpen(node);
  };

  const handleConstellationFocus = (c: Constellation | null) => {
    setActiveConstellation(c);
    if (c) setActiveFilter(c);
    else setActiveFilter(null);
  };

  const toggleFilter = (id: Constellation) => {
    const next = activeFilter === id ? null : id;
    setActiveFilter(next);
    if (next) {
      setCwd(`~/${next}`);
      setActiveConstellation(next);
      playConstellationEntry(next);
    } else {
      setCwd("~/cosmos");
      setActiveConstellation(null);
    }
  };

  const visibleConstellations = activeFilter
    ? CONSTELLATIONS.filter((c) => c.id === activeFilter)
    : CONSTELLATIONS;

  const isDominant = (id: Constellation) =>
    signal?.dominant === id || activeConstellation === id;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        fontFamily: "var(--font-mono)",
        position: "relative",
        overflowX: "hidden",
        paddingBottom: "64px",
      }}
    >
      <div
        aria-hidden="true"
        style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
      >
        {Array.from({ length: 9 }, (_, i) => (
          <HazeParticle key={i} index={i} />
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 1, padding: "24px 16px" }}>
        <div style={{ textAlign: "center", marginBottom: "28px", paddingTop: "20px" }}>
          <svg
            width="40"
            height="50"
            viewBox="0 0 32 40"
            style={{ filter: "drop-shadow(0 0 12px rgba(123, 104, 238, 0.8))", marginBottom: "14px" }}
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
          <p style={{ color: "var(--text-muted)", fontSize: "12px" }}>
            a drop in the cosmos
          </p>
        </div>

        {signal && signal.sessionDepth > 0 && (
          <div
            style={{
              background: "rgba(196, 149, 106, 0.04)",
              border: "1px solid rgba(196, 149, 106, 0.1)",
              borderRadius: "8px",
              padding: "10px 14px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span style={{ color: "var(--accent-tobacco)", fontSize: "12px", opacity: 0.5, flexShrink: 0 }}>
              ◈
            </span>
            <span style={{ color: "var(--text-muted)", fontSize: "11px", fontStyle: "italic", lineHeight: 1.5 }}>
              {signal.hint}
            </span>
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            paddingBottom: "4px",
            marginBottom: "20px",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
          } as React.CSSProperties}
        >
          {CONSTELLATIONS.map((c) => {
            const active = activeFilter === c.id;
            return (
              <button
                key={c.id}
                onClick={() => toggleFilter(c.id)}
                style={{
                  background: active ? `rgba(${hexToRgb(c.color)}, 0.14)` : "rgba(255,255,255,0.025)",
                  border: `1px solid ${active ? c.color : "var(--border-dim)"}`,
                  borderRadius: "20px",
                  padding: "5px 12px",
                  color: active ? c.color : "var(--text-muted)",
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
              >
                {c.symbol} {c.label}
              </button>
            );
          })}
        </div>

        {visibleConstellations.map((c) => {
          const nodes = allNodes.filter((n) => n.constellation === c.id);
          const dominant = isDominant(c.id);

          return (
            <div key={c.id} style={{ marginBottom: "28px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "8px",
                  marginBottom: "12px",
                  paddingLeft: "2px",
                }}
              >
                <span
                  style={{
                    color: c.color,
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textShadow: dominant ? `0 0 12px rgba(${hexToRgb(c.color)}, 0.5)` : "none",
                    transition: "text-shadow 0.4s ease",
                  }}
                >
                  {c.symbol} {c.label}
                </span>
                <span style={{ color: "var(--text-dim)", fontSize: "10px" }}>— {c.desc}</span>
                {dominant && (
                  <span style={{ color: "var(--accent-tobacco)", fontSize: "9px", opacity: 0.5, marginLeft: "auto", letterSpacing: "0.08em" }}>
                    ◈ active
                  </span>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  overflowX: "auto",
                  paddingBottom: "8px",
                  scrollbarWidth: "none",
                  WebkitOverflowScrolling: "touch",
                } as React.CSSProperties}
              >
                {nodes.map((node) => {
                  const variant = nodeVariant(node.id);
                  const cardW = variant < 2 ? 158 : 142;

                  return (
                    <button
                      key={node.id}
                      onClick={() => handleNodeOpen(node)}
                      style={{
                        background: dominant ? `rgba(${hexToRgb(c.color)}, 0.06)` : "var(--bg-terminal)",
                        border: `1px solid ${dominant ? `rgba(${hexToRgb(c.color)}, 0.3)` : "var(--border-terminal)"}`,
                        borderRadius: "10px",
                        padding: "12px 14px",
                        textAlign: "left",
                        cursor: "pointer",
                        fontFamily: "var(--font-mono)",
                        minWidth: `${cardW}px`,
                        maxWidth: "210px",
                        flexShrink: 0,
                        transition: "border-color 0.2s ease, background 0.2s ease",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {dominant && (
                        <div
                          aria-hidden="true"
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "radial-gradient(ellipse at top right, rgba(196,149,106,0.05), transparent 70%)",
                            pointerEvents: "none",
                          }}
                        />
                      )}
                      <div style={{ color: "var(--text-primary)", fontSize: "12px", lineHeight: 1.4, marginBottom: node.subtitle ? "4px" : 0 }}>
                        {node.title}
                      </div>
                      {node.subtitle && (
                        <div style={{ color: "var(--text-dim)", fontSize: "10px", lineHeight: 1.3 }}>
                          {node.subtitle}
                        </div>
                      )}
                      <div
                        style={{
                          marginTop: "10px",
                          width: `${Math.min(90, 25 + (node.weight || 5) * 7)}%`,
                          height: "1px",
                          background: c.color,
                          opacity: dominant ? 0.45 : 0.2,
                          transition: "opacity 0.3s ease",
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {signal && signal.sessionDepth > 0 && <SignalTrace signal={signal} />}

        <div style={{ textAlign: "center", paddingBottom: "16px", display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
          <a href="/achievements" style={{ color: "var(--accent-gold)", fontSize: "12px", textDecoration: "none", fontFamily: "var(--font-mono)" }}>
            [achievements]
          </a>
          <a href="/hire" style={{ color: "var(--accent-drop)", fontSize: "12px", textDecoration: "none", fontFamily: "var(--font-mono)" }}>
            [hire]
          </a>
          <a href="https://lichess.org/@/Dropstone34" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-muted)", fontSize: "12px", textDecoration: "none", fontFamily: "var(--font-mono)" }}>
            [chess]
          </a>
          <a href="/about" style={{ color: "var(--text-muted)", fontSize: "12px", textDecoration: "none", fontFamily: "var(--font-mono)" }}>
            [about]
          </a>
        </div>
      </div>

      <MobileCliBar
        cwd={cwd}
        setCwd={setCwd}
        onNodeOpen={handleNodeOpen}
        onConstellationFocus={handleConstellationFocus}
      />
    </div>
  );
}