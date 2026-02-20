import { visitParents } from "unist-util-visit-parents";
import type { Root, Element } from "hast";

export default function rehypeAddButtonClass(): (tree: Root) => void {
  return (tree) => {
    // SỬA Ở ĐÂY: Đổi Element[] thành (Root | Element)[]
    visitParents(
      tree,
      "element",
      (node: Element, ancestors: (Root | Element)[]) => {
        if (!node || !node.tagName) return;

        const targetTags = [
          "p",
          "li",
          "ul",
          "ol",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "blockquote",
          "pre",
          "code",
          "figure",
          "table",
        ];
        if (!targetTags.includes(node.tagName)) return;

        const props = node.properties || {};
        let currentClasses: string[] = [];

        if (Array.isArray(props.className)) {
          currentClasses = [...(props.className as string[])];
        } else if (typeof props.className === "string") {
          currentClasses = props.className.split(" ");
        }

        if (currentClasses.some((c) => ["wide", "full", "main"].includes(c)))
          return;

        const isSkip = ancestors.some((a) => {
          // SỬA Ở ĐÂY: Báo cho TypeScript biết bỏ qua thằng Root
          if (a.type !== "element") return false;

          if (a.tagName === "blockquote") return true;

          const aClasses = Array.isArray(a.properties?.className)
            ? (a.properties.className as string[])
            : typeof a.properties?.className === "string"
              ? a.properties.className.split(" ")
              : [];
          return aClasses.some(
            (c) => c === "admonition" || c.startsWith("admonition-"),
          );
        });

        // SỬA Ở ĐÂY: Kiểm tra cha trực tiếp cũng phải chắc chắn nó là element
        const parent = ancestors[ancestors.length - 1];
        const isDirectChildOfLi =
          parent && parent.type === "element" && parent.tagName === "li";

        if (
          !isSkip &&
          !isDirectChildOfLi &&
          !currentClasses.includes("button")
        ) {
          node.properties = {
            ...props,
            className: [...currentClasses, "button"],
          };
        }
      },
    );
  };
}
