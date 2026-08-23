import { allNodes, ContentNode } from "@/data/index";
import { essays, notes } from "@/lib/content";

export type FsEntryType = "dir" | "file";

export interface FsEntry {
  name: string;
  type: FsEntryType;
  color: string;
  description: string;
}

export interface PathResult {
  path: string;
  error?: string;
}

const CONSTELLATION_COLORS: Record<string, string> = {
  cosmos: "#00D4FF",
  build: "#7B68EE",
  mind: "#FFD700",
  arena: "#00FF88",
  drop: "#7B68EE",
};

const ROOT_DIRS: FsEntry[] = [
  { name: "cosmos", type: "dir", color: "#00D4FF", description: "what I wonder" },
  { name: "build", type: "dir", color: "#7B68EE", description: "what I make" },
  { name: "mind", type: "dir", color: "#FFD700", description: "what I think" },
  { name: "arena", type: "dir", color: "#00FF88", description: "how I compete" },
  { name: "drop", type: "dir", color: "#7B68EE", description: "the center" },
  { name: "essays", type: "dir", color: "#E8E8E8", description: "long-form writing" },
  { name: "notes", type: "dir", color: "#E8E8E8", description: "short garden entries" },
];

const CONSTELLATION_DIRS = ["cosmos", "build", "mind", "arena", "drop"];

function parsePath(path: string): string[] {
  return path.replace(/^~\/?/, "").split("/").filter(Boolean);
}

function buildPath(parts: string[]): string {
  return parts.length === 0 ? "~" : `~/${parts.join("/")}`;
}

function err(path: string, message: string): PathResult {
  return { path, error: message };
}

function validatePath(parts: string[], fallback: string): PathResult {
  if (parts.length === 0) return { path: "~" };

  const [dir, sub] = parts;
  const rootDir = ROOT_DIRS.find((d) => d.name === dir);
  if (!rootDir) return err(fallback, `no such directory: ${dir}`);
  if (parts.length === 1) return { path: buildPath(parts) };

  if (CONSTELLATION_DIRS.includes(dir)) {
    const node = allNodes.find((n) => n.constellation === dir && n.id === sub);
    if (!node) return err(buildPath([dir]), `no such file or directory: ${sub}`);
    return { path: buildPath(parts.slice(0, 2)) };
  }

  if (dir === "essays") {
    const essay = essays.find((e) => e.slug === sub);
    if (!essay) return err(buildPath([dir]), `no such file or directory: ${sub}`);
    return { path: buildPath(parts.slice(0, 2)) };
  }

  if (dir === "notes") {
    const note = notes.find((n) => n.slug === sub);
    if (!note) return err(buildPath([dir]), `no such file or directory: ${sub}`);
    return { path: buildPath(parts.slice(0, 2)) };
  }

  return err(buildPath([dir]), `no such directory: ${parts.join("/")}`);
}

export function resolvePath(cwd: string, input: string): PathResult {
  const trimmed = input.trim();
  if (trimmed === "~" || trimmed === "/") return { path: "~" };

  const parts = parsePath(cwd);

  if (trimmed === "..") {
    return parts.length === 0 ? { path: "~" } : { path: buildPath(parts.slice(0, -1)) };
  }

  if (trimmed.startsWith("~/")) {
    return validatePath(parsePath(trimmed), cwd);
  }

  return validatePath([...parts, ...trimmed.split("/").filter(Boolean)], cwd);
}

export function lsPath(path: string): FsEntry[] {
  const parts = parsePath(path);

  if (parts.length === 0) return ROOT_DIRS;

  const [dir] = parts;

  if (parts.length === 1) {
    if (CONSTELLATION_DIRS.includes(dir)) {
      const color = CONSTELLATION_COLORS[dir];
      return allNodes
        .filter((n) => n.constellation === dir)
        .map((n) => ({
          name: n.id,
          type: "file" as FsEntryType,
          color,
          description: n.subtitle || n.tooltip.slice(0, 48),
        }));
    }
    if (dir === "essays") {
      return essays
        .filter((e) => e.status === "public")
        .map((e) => ({
          name: e.slug,
          type: "file" as FsEntryType,
          color: "#E8E8E8",
          description: e.subtitle,
        }));
    }
    if (dir === "notes") {
      return notes
        .filter((n) => n.status === "public")
        .map((n) => ({
          name: n.slug,
          type: "file" as FsEntryType,
          color: "#E8E8E8",
          description: n.excerpt.slice(0, 48),
        }));
    }
  }

  return [];
}

export function catPath(path: string): string | null {
  const parts = parsePath(path);
  if (parts.length < 2) return null;

  const [dir, sub] = parts;

  if (CONSTELLATION_DIRS.includes(dir)) {
    const node = allNodes.find((n) => n.constellation === dir && n.id === sub);
    return node?.content || node?.tooltip || null;
  }

  if (dir === "essays") {
    const essay = essays.find((e) => e.slug === sub);
    return essay ? `${essay.title}\n${essay.subtitle}\n\n${essay.body}` : null;
  }

  if (dir === "notes") {
    const note = notes.find((n) => n.slug === sub);
    return note ? `${note.title}\n\n${note.body}` : null;
  }

  return null;
}

export function getNodeForPath(path: string): ContentNode | null {
  const parts = parsePath(path);
  if (parts.length < 2) return null;
  const [dir, sub] = parts;
  if (!CONSTELLATION_DIRS.includes(dir)) return null;
  return allNodes.find((n) => n.constellation === dir && n.id === sub) || null;
}

export function getConstellationForPath(path: string): string | null {
  const parts = parsePath(path);
  if (parts.length === 0) return null;
  const [dir] = parts;
  return CONSTELLATION_DIRS.includes(dir) ? dir : null;
}

export function isLeafPath(path: string): boolean {
  return parsePath(path).length >= 2;
}

export function getPathColor(path: string): string {
  const parts = parsePath(path);
  if (parts.length === 0) return "#7B68EE";
  return CONSTELLATION_COLORS[parts[0]] || "#E8E8E8";
}