import { visit } from "unist-util-visit";
import type { Root } from "mdast";
import type { ContainerDirective } from "mdast-util-directive";

export default function remarkCollapse() {
  return (tree: Root) => {
    visit(tree, "containerDirective", (node: ContainerDirective) => {
      if (node.name !== "collapse") return;

      const data = (node.data ??= {});

      const isOpen = node.attributes?.open === "true";

      data.hName = "details";

      data.hProperties = {
        ...(data.hProperties || {}),
        open: isOpen ? true : undefined,
      };

      // title
      let title = node.attributes?.title || "Xem chi tiết";

      const firstChild = node.children?.[0] as any;

      if (firstChild?.data?.directiveLabel) {
        title = firstChild.children?.[0]?.value || title;
        node.children.shift();
      }

      const summary = {
        type: "paragraph",
        data: { hName: "summary" },
        children: [{ type: "text", value: title }],
      };

      node.children.unshift(summary as any);
    });
  };
}
