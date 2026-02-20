import { visitParents } from "unist-util-visit-parents";
import type { Root, Element } from "hast";

export default function rehypeAddButtonClass(): (tree: Root) => void {
  return (tree) => {
    // Hàm hỗ trợ: Lấy class siêu an toàn và vét cạn mọi ngóc ngách của một node
    const getClasses = (node: Element): string[] => {
      let cls: string[] = [];
      if (!node || !node.properties) return cls;

      if (Array.isArray(node.properties.className))
        cls.push(...(node.properties.className as string[]));
      else if (typeof node.properties.className === "string")
        cls.push(...node.properties.className.split(" "));

      if (Array.isArray(node.properties.class))
        cls.push(...(node.properties.class as string[]));
      else if (typeof node.properties.class === "string")
        cls.push(...node.properties.class.split(" "));

      return [...new Set(cls)].filter(Boolean);
    };

    visitParents(
      tree,
      "element",
      (node: Element, ancestors: (Root | Element)[]) => {
        if (!node || node.type !== "element") return;

        const targetTags = [
          "p",
          "li",
          "div",
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
          "img",
          "figcaption",
        ];

        if (!targetTags.includes(node.tagName)) return;

        node.properties = node.properties || {};

        // 1. Lấy class của node hiện tại
        let classes = getClasses(node);
        delete node.properties.class; // Dọn rác chỉ định cho node hiện tại

        // =========================================================
        // 2. KIỂM TRA TỔ TIÊN: SỬ DỤNG HÀM GETCLASSES SIÊU AN TOÀN
        // =========================================================
        const isSkip = ancestors.some((a) => {
          if (!a || a.type !== "element") return false;

          // Chặn nếu nằm trong <figure> hoặc <blockquote>
          if (a.tagName === "blockquote" || a.tagName === "figure") return true;

          // MOI MÓC CLASS CỦA TỔ TIÊN RA KIỂM TRA
          const aClasses = getClasses(a as Element);

          // Nếu tổ tiên có chứa wide, full, main -> BÁO HIỆU BỎ QUA NGAY!
          return aClasses.some(
            (c) =>
              c === "admonition" ||
              c.startsWith("admonition-") ||
              ["wide", "full", "main"].includes(c),
          );
        });

        const parent = ancestors[ancestors.length - 1];
        const isDirectChildOfLi =
          parent && parent.type === "element" && parent.tagName === "li";

        // =========================================================
        // 3. CƠ CHẾ GẮN / XÓA CLASS CƯỠNG CHẾ
        // =========================================================
        if (isSkip || isDirectChildOfLi) {
          // Nếu nằm trong 'wide', vặt lông chữ 'button' ngay lập tức
          classes = classes.filter((c) => c !== "button");
        } else {
          // Nếu đứng độc lập, khoác áo 'button' vào
          if (!classes.includes("button")) {
            classes.push("button");
          }
        }

        // Lưu kết quả lại
        if (classes.length > 0) {
          node.properties.className = classes;
        } else {
          delete node.properties.className; // Xóa luôn cho HTML sạch bóng
        }
      },
    );
  };
}
