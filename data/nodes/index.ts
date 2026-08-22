export { dropNodes } from "./drop";
export { buildNodes } from "./build";
export { mindNodes } from "./mind";
export { cosmosNodes } from "./cosmos";
export { arenaNodes } from "./arena";

import { dropNodes } from "./drop";
import { buildNodes } from "./build";
import { mindNodes } from "./mind";
import { cosmosNodes } from "./cosmos";
import { arenaNodes } from "./arena";

export const allNodes = [
  ...dropNodes,
  ...buildNodes,
  ...mindNodes,
  ...cosmosNodes,
  ...arenaNodes,
];