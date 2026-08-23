"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { resolvePath, lsPath, catPath, getPathColor } from "@/lib/cli-fs";
import { playNavigateBack, playError } from "@/lib/sounds";

interface CliBarProps {
  initialPath: string;
}

interface OutputLine {
  id: number;
  text: string;
  isError?: boolean;
}

let lineId = 0;

export default function CliBar({ initialPath }: CliBarProps) {
  const router = useRouter();
  const [cwd, setCwd] = useState(initialPath);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const emit = useCallback((text: string, isError = false) => {
    setOutput((prev) => [...prev.slice(-6), { id: lineId++, text, isError }]);
  }, []);

  const execute = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      const [cmd, ...args] = trimmed.split(/\s+/);
      const cmdLower = cmd.toLowerCase();

      if (cmdLower === "cd") {
        const target = args.join(" ") || "~";

        if (target === ".." || target === "~" || target === "/") {
          if (target === "..") {
            const parts = cwd.replace(/^~\/?/, "").split("/").filter(Boolean);
            if (parts.length <= 1) {
              router.back();
              playNavigateBack();
              return;
            }
            const newPath = `~/${parts.slice(0, -1).join("/")}`;
            setCwd(newPath);
            playNavigateBack();
            emit(newPath);
            return;
          }
          router.push("/");
          playNavigateBack();
          return;
        }

        const result = resolvePath(cwd, target);
        if (result.error) {
          playError();
          emit(`cd: ${result.error}`, true);
          return;
        }
        setCwd(result.path);
        emit(result.path);
        return;
      }

      if (cmdLower === "ls") {
        const target = args[0] ? resolvePath(cwd, args[0]).path : cwd;
        const entries = lsPath(target);
        if (entries.length === 0) {
          emit("(empty)", true);
        } else {
          entries.forEach((e) => emit(`  ${e.type === "dir" ? "/" : " "}${e.name}`));
        }
        return;
      }

      if (cmdLower === "pwd") {
        emit(cwd);
        return;
      }

      if (cmdLower === "exit") {
        router.push("/");
        playNavigateBack();
        return;
      }

      if (cmdLower === "cat") {
        const target = args.join(" ");
        if (!target) { emit("cat: missing operand", true); return; }
        const resolved = resolvePath(cwd, target);
        const content = catPath(resolved.path);
        if (!content) {
          playError();
          emit(`cat: ${target}: no such file`, true);
        } else {
          content.split("\n").slice(0, 8).forEach((l) => emit(l));
        }
        return;
      }

      emit(`command not found: ${trimmed}`, true);
    },
    [cwd, emit, router]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        execute(input);
        setInput("");
      }
      if (e.key === "Escape") {
        setExpanded(false);
      }
    },
    [input, execute]
  );

  const pathColor = getPathColor(cwd);

  return (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "12px",
        marginBottom: "20px",
      }}
    >
      {expanded && output.length > 0 && (
        <div
          style={{
            background: "var(--bg-terminal)",
            border: "1px solid var(--border-terminal)",
            borderBottom: "none",
            borderRadius: "6px 6px 0 0",
            padding: "8px 12px",
            maxHeight: "120px",
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
          background: "var(--bg-terminal)",
          border: "1px solid var(--border-terminal)",
          borderRadius: expanded && output.length > 0 ? "0 0 6px 6px" : "6px",
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "text",
        }}
        onClick={() => {
          setExpanded(true);
          inputRef.current?.focus();
        }}
      >
        <span style={{ color: pathColor, whiteSpace: "nowrap", userSelect: "none" }}>
          {cwd} ❯
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setExpanded(true)}
          placeholder={expanded ? "" : "cd .. · ls · exit"}
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
        {!expanded && (
          <span style={{ color: "var(--text-dim)", fontSize: "10px", userSelect: "none" }}>
            ↵
          </span>
        )}
      </div>
    </div>
  );
}