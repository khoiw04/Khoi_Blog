import { visit } from "unist-util-visit";
import type { Root } from "hast";

export default function rehypeOlStartCounter() {
  return (tree: Root) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "ol") {
        const start = node.properties?.start;

        if (start !== undefined) {
          const value = Number(start) - 1;

          // add style
          const style = node.properties.style || "";
          node.properties.style = [
            node.properties.style,
            `counter-reset: item ${value}`,
          ]
            .filter(Boolean)
            .join("; ");
        }
      }
    });
  };
}
