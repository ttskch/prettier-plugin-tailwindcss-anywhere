import type { AstPath, Doc } from "prettier";
import type { AnywhereNode } from "./types.js";

export const print = (path: AstPath): Doc => {
  const node: AnywhereNode = path.node;
  return node.body;
};
