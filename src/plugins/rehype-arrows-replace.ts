import { visit } from "unist-util-visit";
import type { Root } from "hast";

export default function rehypeArrows() {
  return (tree: Root) => {
    visit(tree, "text", (node) => {
      node.value = node.value
        .replace(/>=/g, "≥")
        .replace(/<=/g, "≤")
        .replace(/!=/g, "≠")
        .replace(/==/g, "≡")
        .replace(/->/g, "→")
        .replace(/<-/g, "←")
        .replace(/-\^/g, "↑")
        .replace(/v-/g, "↓")
        .replace(/=>/g, "⇒")
        .replace(/<=>/g, "⇔");
    });
  };
}
