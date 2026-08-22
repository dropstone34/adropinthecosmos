export type NodeType = "idea" | "book" | "person" | "project" | "stat" | "poem" | "quote";
export type Constellation = "drop" | "build" | "mind" | "cosmos" | "arena";

export interface ContentNode {
  id: string;
  title: string;
  subtitle?: string;
  type: NodeType;
  constellation: Constellation;
  connections: string[];
  weight: number;
  tooltip: string;
  content?: string;
  meta?: Record<string, string | number>;
  color?: string;
  date?: string;
}

export interface TerminalCommand {
  command: string;
  aliases?: string[];
  description: string;
  output: string | ((args: string[]) => string);
  type: "info" | "navigate" | "easter-egg" | "live";
  navigateTo?: string;
}