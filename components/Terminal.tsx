"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { TERMINAL_COMMANDS, allNodes, ContentNode } from "@/data/index";
import {
  resolvePath,
  lsPath,
  catPath,
  getNodeForPath,
  getConstellationForPath,
  isLeafPath,
  getPathColor,
} from "@/lib/cli-fs";
import {
  playConstellationEntry,
  playNodeEntry,
  playNavigateBack,
  playError,
  setSoundEnabled,
  isSoundEnabled,
} from "@/lib/sounds";

interface TerminalLine {
  id: number;
  type: "input" | "output" | "error" | "highlight" | "gold" | "green" | "cyan" | "dim";
  text: string;
}

interface TerminalProps {
  onNodeOpen: (node: ContentNode) => void;
  onConstellationFocus: (constellation: string | null) => void;
  onClose?: () => void;
}

let lineIdCounter = 0;

const GHOST_HINTS = [
  "try: ls",
  "try: cd cosmos",
  "try: whoami",
  "try: cd essays",
  "try: wander",
];

export default function Terminal({ onNodeOpen, onConstellationFocus, onClose }: TerminalProps) {
  const router = useRouter();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [cwd, setCwd] = useState("~/cosmos");
  const [showGhostHint, setShowGhostHint] = useState(false);
  const [ghostHintIndex, setGhostHintIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
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

  useEffect(() => {
    const startIdleTimer = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        if (!hasInteracted.current) setShowGhostHint(true);
      }, 5000);
    };
    startIdleTimer();
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!showGhostHint) return;
    const interval = setInterval(() => {
      setGhostHintIndex((i) => (i + 1) % GHOST_HINTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [showGhostHint]);

  const typeOutput = useCallback(
    (outputLines: string[], delay = 28) => {
      return new Promise<void>((resolve) => {
        setIsTyping(true);
        let i = 0;
        const next = () => {
          if (i < outputLines.length) {
            const line = outputLines[i];
            let type: TerminalLine["type"] = "output";
            if (line.startsWith("◈") || line.startsWith("→")) type = "highlight";
            else if (line.startsWith("  Rating:") || line.includes("PR:")) type = "green";
            else if (line.startsWith("  ─") || line.startsWith("  ═") || line === "") type = "dim";
            else if (line.includes("Error:") || line.includes("cannot remove") || line.startsWith("cd:") || line.startsWith("cat:")) type = "error";
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
      const trimmed = raw.trim();
      if (!trimmed) return;

      hasInteracted.current = true;
      setShowGhostHint(false);

      addLine("input", trimmed);
      addLine("dim", "");

      const lower = trimmed.toLowerCase();
      const [cmd, ...args] = trimmed.split(/\s+/);
      const cmdLower = cmd.toLowerCase();

      if (cmdLower === "cd") {
        const target = args.join(" ") || "~";
        if (target === "~" || target === "/") {
          setCwd("~");
          playNavigateBack();
          onConstellationFocus(null);
          await typeOutput(["~"]);
          addLine("dim", "");
          return;
        }

        const result = resolvePath(cwd, target);
        if (result.error) {
          playError();
          await typeOutput([`cd: ${result.error}`]);
          addLine("dim", "");
          return;
        }

        const newCwd = result.path;
        setCwd(newCwd);

        const constellation = getConstellationForPath(newCwd);
        if (constellation) onConstellationFocus(constellation);

        if (isLeafPath(newCwd)) {
          const node = getNodeForPath(newCwd);
          if (node) {
            const c = node.constellation as "drop" | "build" | "mind" | "cosmos" | "arena";
            playNodeEntry(c);
            await typeOutput([newCwd, "", node.tooltip]);
            setTimeout(() => onNodeOpen(node), 400);
          }
        } else if (constellation) {
          playConstellationEntry(constellation as "drop" | "build" | "mind" | "cosmos" | "arena");
          const entries = lsPath(newCwd);
          const lines = [newCwd, ""];
          entries.forEach((e) => {
            lines.push(`  ${e.name.padEnd(28)} ${e.description}`);
          });
          lines.push("", "→ cd <name> to enter · ls to list · cd .. to go back");
          await typeOutput(lines);
        } else {
          playNavigateBack();
          const entries = lsPath(newCwd);
          const lines = [newCwd, ""];
          entries.forEach((e) => {
            lines.push(`  ${e.type === "dir" ? "/" : " "}${e.name.padEnd(27)} ${e.description}`);
          });
          await typeOutput(lines);
        }

        addLine("dim", "");
        return;
      }

      if (cmdLower === "ls") {
        const target = args[0] ? resolvePath(cwd, args[0]).path : cwd;
        const entries = lsPath(target);
        if (entries.length === 0) {
          await typeOutput([`ls: cannot access '${target}': no entries`]);
        } else {
          const out = entries.map(
            (e) => `  ${e.type === "dir" ? "/" : " "}${e.name.padEnd(28)} ${e.description}`
          );
          await typeOutput([target, "", ...out]);
        }
        addLine("dim", "");
        return;
      }

      if (cmdLower === "pwd") {
        await typeOutput([cwd]);
        addLine("dim", "");
        return;
      }

      if (cmdLower === "exit") {
        setCwd("~/cosmos");
        onConstellationFocus(null);
        playNavigateBack();
        await typeOutput(["returning to ~/cosmos"]);
        addLine("dim", "");
        return;
      }

      if (cmdLower === "cat") {
        const target = args.join(" ");
        if (!target) {
          await typeOutput(["cat: missing operand"]);
          addLine("dim", "");
          return;
        }
        const resolved = resolvePath(cwd, target);
        const content = catPath(resolved.path);
        if (!content) {
          playError();
          await typeOutput([`cat: ${target}: no such file`]);
        } else {
          await typeOutput(content.split("\n"), 18);
        }
        addLine("dim", "");
        return;
      }

      if (cmdLower === "sound") {
        const arg = args[0]?.toLowerCase();
        if (arg === "off") {
          setSoundEnabled(false);
          await typeOutput(["sound: off"]);
        } else if (arg === "on") {
          setSoundEnabled(true);
          await typeOutput(["sound: on"]);
        } else {
          await typeOutput([`sound: ${isSoundEnabled() ? "on" : "off"}`, "→ sound on · sound off"]);
        }
        addLine("dim", "");
        return;
      }

      const found = TERMINAL_COMMANDS.find(
        (c) =>
          c.command === lower ||
          (c.aliases && c.aliases.some((a) => a === lower)) ||
          c.command === lower.split(" ")[0]
      );

      const nodeMatch = allNodes.find(
        (n) =>
          n.id === lower ||
          n.title.toLowerCase() === lower ||
          n.id.replace(/-/g, " ") === lower ||
          (lower === "frankl" && n.id === "mans-search") ||
          (lower === "frost" && n.id === "frost-poem") ||
          (lower === "fermi" && n.id === "fermi-paradox") ||
          (lower === "vedic" && n.id === "vedic-cosmos") ||
          (lower === "scale" && n.id === "cosmos-scale") ||
          (lower === "dubov" && n.id === "dubov") ||
          (lower === "cruyff" && n.id === "cruyff") ||
          (lower === "nietzsche" && n.id === "nietzsche") ||
          (lower === "dostoevsky" && n.id === "dostoevsky") ||
          (lower === "rousseau" && n.id === "rousseau") ||
          (lower === "football" && n.id === "cruyff") ||
          (lower === "f1" && n.id === "f1-racing") ||
          (lower === "running" && n.id === "running") ||
          (lower === "chess" && n.id === "chess-rating")
      );

      if (found) {
        const output = typeof found.output === "function" ? found.output([]) : found.output;

        if (found.command === "wander") {
          const randomNode = allNodes[Math.floor(Math.random() * allNodes.length)];
          const c = randomNode.constellation as "drop" | "build" | "mind" | "cosmos" | "arena";
          playNodeEntry(c);
          await typeOutput([`wandering to: ${randomNode.title}...`, "", randomNode.tooltip]);
          setTimeout(() => onNodeOpen(randomNode), 400);
          addLine("dim", "");
          return;
        }

        if (["hire", "now", "essays", "notes", "build", "signals"].includes(found.command)) {
          await typeOutput([output]);
          setTimeout(() => router.push(`/${found.command}`), 300);
          addLine("dim", "");
          return;
        }

        if (found.command === "github") {
          await typeOutput([output]);
          setTimeout(() => window.open("https://github.com/dropstone34", "_blank", "noopener,noreferrer"), 300);
          addLine("dim", "");
          return;
        }

        if (found.command === "linkedin") {
          await typeOutput([output]);
          setTimeout(() => window.open("https://www.linkedin.com/in/prakhar34", "_blank", "noopener,noreferrer"), 300);
          addLine("dim", "");
          return;
        }

        if (found.command === "subscribe") {
          await typeOutput(output.split("\n"));
          addLine("dim", "");
          return;
        }

        if (["build", "mind", "cosmos", "arena", "drop"].includes(found.command)) {
          const c = found.command as "drop" | "build" | "mind" | "cosmos" | "arena";
          playConstellationEntry(c);
          onConstellationFocus(found.command);
          setCwd(`~/${found.command}`);
        }

        await typeOutput(output.split("\n"));

        if (found.navigateTo) {
          const node = allNodes.find((n) => n.id === found.navigateTo);
          if (node) {
            const c = node.constellation as "drop" | "build" | "mind" | "cosmos" | "arena";
            playNodeEntry(c);
            setTimeout(() => onNodeOpen(node), 600);
          }
        }
      } else if (nodeMatch) {
        const c = nodeMatch.constellation as "drop" | "build" | "mind" | "cosmos" | "arena";
        playNodeEntry(c);
        await typeOutput([`opening: ${nodeMatch.title}...`]);
        setTimeout(() => onNodeOpen(nodeMatch), 400);
      } else {
        playError();
        await typeOutput([
          `command not found: ${trimmed}`,
          "",
          "type 'help' for available commands.",
          "or just wander.",
        ]);
      }

      addLine("dim", "");
    },
    [addLine, typeOutput, onNodeOpen, onConstellationFocus, router, cwd]
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

  const handleClear = useCallback(() => {
    setLines([]);
    setInputValue("");
    setShowGhostHint(false);
    onConstellationFocus(null);
    onClose?.();
    inputRef.current?.focus();
  }, [onClose, onConstellationFocus]);

  const pathColor = getPathColor(cwd);

  return (
    <div
      className="terminal-window"
      style={{ width: "100%", maxWidth: isMaximized ? "900px" : "560px" }}
    >
      <div className="terminal-titlebar">
        <button
          aria-label="Clear terminal"
          className="terminal-dot terminal-dot-red"
          onClick={handleClear}
          type="button"
          title="Clear terminal"
        />
        <button
          aria-label={isMinimized ? "Restore terminal" : "Minimize terminal"}
          className="terminal-dot terminal-dot-yellow"
          onClick={() => setIsMinimized((v) => !v)}
          type="button"
          title={isMinimized ? "Restore terminal" : "Minimize terminal"}
        />
        <button
          aria-label={isMaximized ? "Restore terminal size" : "Maximize terminal"}
          className="terminal-dot terminal-dot-green"
          onClick={() => setIsMaximized((v) => !v)}
          type="button"
          title={isMaximized ? "Restore terminal size" : "Maximize terminal"}
        />
        <span className="terminal-title">
          prakhar@cosmos:{" "}
          <span style={{ color: pathColor }}>{cwd}</span>
          {isMinimized ? " — minimized" : isMaximized ? " — expanded" : ""}
        </span>
      </div>

      {!isMinimized && (
        <div
          ref={bodyRef}
          className="terminal-body"
          onClick={handleContainerClick}
          style={{
            cursor: "text",
            minHeight: isMaximized ? "460px" : undefined,
            maxHeight: isMaximized ? "72vh" : undefined,
          }}
        >
          {lines.map((line) => (
            <div
              key={line.id}
              className={`terminal-output ${line.type !== "input" ? line.type : ""}`}
            >
              {line.type === "input" ? (
                <div className="terminal-line">
                  <span className="terminal-prompt">
                    <span style={{ color: pathColor }}>{cwd}</span>
                    {" ❯ "}
                  </span>
                  <span className="terminal-input">{line.text}</span>
                </div>
              ) : (
                <div style={{ paddingLeft: line.text === "" ? 0 : "4px" }}>{line.text}</div>
              )}
            </div>
          ))}

          <div className="terminal-line" style={{ marginTop: "4px" }}>
            <span className="terminal-prompt">
              <span style={{ color: pathColor }}>{cwd}</span>
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
              {showGhostHint && !inputValue && !isTyping && (
                <span
                  className="ghost-hint"
                  style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}
                >
                  {GHOST_HINTS[ghostHintIndex]}
                </span>
              )}
            </span>
            {isTyping && <span className="cursor" />}
          </div>
        </div>
      )}
    </div>
  );
}