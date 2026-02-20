import { visit } from "unist-util-visit";
import type { Root } from "mdast";
import type { Plugin } from "unified";

const remarkGridColumnClass: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === "textDirective" ||
        node.type === "leafDirective" ||
        node.type === "containerDirective"
      ) {
        const layoutTypes = ["main", "wide", "full"];

        if (layoutTypes.includes(node.name)) {
          const data = node.data || (node.data = {});
          const attributes = (node.attributes as Record<string, string>) || {};

          // Thiết lập tag HTML là <div> và gán class tương ứng
          data.hName = "div";
          data.hProperties = {
            ...attributes,
            class: `${node.name} ${attributes.class || ""}`.trim(),
          };
        }
      }
    });
  };
};

export default remarkGridColumnClass;
