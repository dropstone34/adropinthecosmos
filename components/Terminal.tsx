"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { TERMINAL_COMMANDS, allNodes, ContentNode } from "@/data/index";

interface TerminalLine {
  id: number;
  type: "input" | "output" | "error" | "highlight" | "gold" | "green" | "cyan" | "dim";
  text: string;
}

interface TerminalProps {
  onNodeOpen: (node: ContentNode) => void;
  onConstellationFocus: (constellation: string | null) => void;
}

let lineIdCounter = 0;

const GHOST_HINTS = ["try: whoami", "try: explore", "try: wander", "try: cosmos"];

export default function Terminal({ onNodeOpen, onConstellationFocus }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showGhostHint, setShowGhostHint] = useState(false);
  const [ghostHintIndex, setGhostHintIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasInteracted = useRef(false);

  const addLine = useCallback((type: TerminalLine["type"], text: string) => {
    setLines((prev) => [...prev, { id: lineIdCounter++, type, text }]);
  }, []);

  const scrollToBottom = useCallback(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  // Ghost hint after idle
  useEffect(() => {
    const startIdleTimer = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        if (!hasInteracted.current) {
          setShowGhostHint(true);
        }
      }, 5000);
    };

    startIdleTimer();
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  // Cycle ghost hints
  useEffect(() => {
    if (!showGhostHint) return;
    const interval = setInterval(() => {
      setGhostHintIndex((i) => (i + 1) % GHOST_HINTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [showGhostHint]);

  const typeOutput = useCallback(
    (lines: string[], delay = 30) => {
      return new Promise<void>((resolve) => {
        setIsTyping(true);
        let i = 0;
        const outputLines = lines;

        const next = () => {
          if (i < outputLines.length) {
            const line = outputLines[i];
            // Detect line type from content
            let type: TerminalLine["type"] = "output";
            if (line.startsWith("◈") || line.startsWith("→")) type = "highlight";
            else if (line.startsWith("  Rating:") || line.includes("PR:")) type = "green";
            else if (line.startsWith("  ─") || line.startsWith("  ═")) type = "dim";
            else if (line.includes("Error:") || line.includes("cannot remove")) type = "error";

            addLine(type, line);
            i++;
            setTimeout(next, delay);
          } else {
            setIsTyping(false);
            resolve();
          }
        };
        next();
      });
    },
    [addLine]
  );

  const executeCommand = useCallback(
    async (raw: string) => {
      const cmd = raw.trim().toLowerCase();
      if (!cmd) return;

      hasInteracted.current = true;
      setShowGhostHint(false);

      // Add input line
      addLine("input", raw.trim());

      // Empty line separator
      addLine("dim", "");

      // Find matching command
      const found = TERMINAL_COMMANDS.find(
        (c) =>
          c.command === cmd ||
          (c.aliases && c.aliases.some((a) => a === cmd)) ||
          // Partial match for node IDs
          c.command === cmd.split(" ")[0]
      );

      // Check for node ID direct navigation
      const nodeMatch = allNodes.find(
        (n) =>
          n.id === cmd ||
          n.title.toLowerCase() === cmd ||
          n.id.replace(/-/g, " ") === cmd ||
          // Short aliases
          (cmd === "frankl" && n.id === "mans-search") ||
          (cmd === "frost" && n.id === "frost-poem") ||
          (cmd === "fermi" && n.id === "fermi-paradox") ||
          (cmd === "vedic" && n.id === "vedic-cosmos") ||
          (cmd === "scale" && n.id === "cosmos-scale") ||
          (cmd === "pale-blue-dot" && n.id === "pale-blue-dot") ||
          (cmd === "dubov" && n.id === "dubov") ||
          (cmd === "cruyff" && n.id === "cruyff") ||
          (cmd === "nietzsche" && n.id === "nietzsche") ||
          (cmd === "dostoevsky" && n.id === "dostoevsky") ||
          (cmd === "rousseau" && n.id === "rousseau") ||
          (cmd === "football" && n.id === "cruyff") ||
          (cmd === "f1" && n.id === "f1-racing") ||
          (cmd === "running" && n.id === "running") ||
          (cmd === "chess" && n.id === "chess-rating")
      );

      if (found) {
        const output =
          typeof found.output === "function" ? found.output([]) : found.output;

        // Handle special commands
        if (found.command === "wander") {
          const randomNode = allNodes[Math.floor(Math.random() * allNodes.length)];
          await typeOutput([`wandering to: ${randomNode.title}...`, "", randomNode.tooltip]);
          setTimeout(() => onNodeOpen(randomNode), 400);
          return;
        }

        if (found.command === "hire") {
          await typeOutput([output]);
          setTimeout(() => {
            window.open("/hire", "_blank");
          }, 300);
          return;
        }

        if (found.command === "subscribe") {
          await typeOutput(output.split("\n"));
          return;
        }

        // Constellation focus commands
        if (["build", "mind", "cosmos", "arena", "drop"].includes(found.command)) {
          onConstellationFocus(found.command);
        }

        await typeOutput(output.split("\n"));

        if (found.navigateTo) {
          const node = allNodes.find((n) => n.id === found.navigateTo);
          if (node) {
            setTimeout(() => onNodeOpen(node), 600);
          }
        }
      } else if (nodeMatch) {
        await typeOutput([`opening: ${nodeMatch.title}...`]);
        setTimeout(() => onNodeOpen(nodeMatch), 400);
      } else {
        // Unknown command
        await typeOutput([
          `command not found: ${cmd}`,
          ``,
          `type 'help' for available commands.`,
          `or just wander.`,
        ]);
      }

      addLine("dim", "");
    },
    [addLine, typeOutput, onNodeOpen, onConstellationFocus]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !isTyping) {
        const val = inputValue;
        setInputValue("");
        executeCommand(val);
      }
    },
    [inputValue, isTyping, executeCommand]
  );

  const handleContainerClick = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="terminal-window" style={{ width: "100%", maxWidth: "560px" }}>
      {/* Title bar */}
      <div className="terminal-titlebar">
        <div className="terminal-dot terminal-dot-red" />
        <div className="terminal-dot terminal-dot-yellow" />
        <div className="terminal-dot terminal-dot-green" />
        <span className="terminal-title">prakhar@cosmos:~</span>
      </div>

      {/* Body */}
      <div
        ref={bodyRef}
        className="terminal-body"
        onClick={handleContainerClick}
        style={{ cursor: "text" }}
      >
        {/* Rendered lines */}
        {lines.map((line) => (
          <div key={line.id} className={`terminal-output ${line.type !== "input" ? line.type : ""}`}>
            {line.type === "input" ? (
              <div className="terminal-line">
                <span className="terminal-prompt">
                  <span className="terminal-prompt-path">~/cosmos</span>
                  {" ❯ "}
                </span>
                <span className="terminal-input">{line.text}</span>
              </div>
            ) : (
              <div style={{ paddingLeft: line.text === "" ? 0 : "4px" }}>{line.text}</div>
            )}
          </div>
        ))}

        {/* Active input line */}
        <div className="terminal-line" style={{ marginTop: "4px" }}>
          <span className="terminal-prompt">
            <span className="terminal-prompt-path">~/cosmos</span>
            {" ❯ "}
          </span>
          <span className="terminal-input" style={{ position: "relative", flex: 1 }}>
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
              autoFocus
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
                fontSize: "13px",
                width: "100%",
                caretColor: "var(--accent-drop)",
              }}
            />
            {/* Ghost hint */}
            {showGhostHint && !inputValue && !isTyping && (
              <span
                className="ghost-hint"
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  pointerEvents: "none",
                }}
              >
                {GHOST_HINTS[ghostHintIndex]}
              </span>
            )}
          </span>
          {isTyping && <span className="cursor" />}
        </div>
      </div>
    </div>
  );
}