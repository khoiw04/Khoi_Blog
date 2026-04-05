import { visit } from "unist-util-visit";
import type { Root } from "mdast";
import type { ContainerDirective } from "mdast-util-directive";

export default function remarkCollapse() {
  return (tree: Root) => {
    visit(tree, "containerDirective", (node: ContainerDirective) => {
      if (node.name !== "collapse") return;

      const data = node.data || (node.data = {});
      data.hName = "details";

      let title = "Xem chi tiết";

      const firstChild = node.children[0] as any;

      if (firstChild?.data?.directiveLabel) {
        title = firstChild.children[0]?.value || title;
        node.children.shift();
      } else if (node.attributes?.title) {
        title = node.attributes.title;
      }

      const tag = node.attributes?.as;

      let titleNode: any = { type: "text" as const, value: title };

      if (tag && ["h1", "h2", "h3", "h4"].includes(tag)) {
        titleNode = {
          type: "heading" as const,
          depth: parseInt(tag.charAt(1)),
          children: [{ type: "text" as const, value: title }],
        };
      }

      const summaryNode = {
        type: "paragraph" as const,
        data: { hName: "summary" },
        children: [titleNode],
      };

      node.children.unshift(summaryNode as any);
    });
  };
}
