import type { AstPath, Doc } from "prettier";

export const print = (path: AstPath): Doc => {
  const node = path.node;

  switch (node.type) {
    case "anywhere": {
      return node.body;
    }
  }

  throw new Error(`Unknown node type: ${node.type}`);
};
