import { visit } from "unist-util-visit";
import type { Root } from "mdast";
import type { Plugin } from "unified";

const remarkGridColumnClass: Plugin<[], Root> = () => {
  return (tree) => {
    // Ép kiểu 'any' cho node vì mdast chưa định nghĩa sẵn kiểu cho remark-directive
    visit(tree, (node: any) => {
      if (
        node.type === "textDirective" ||
        node.type === "leafDirective" ||
        node.type === "containerDirective"
      ) {
        const layoutTypes = ["main", "wide", "full"];

        if (layoutTypes.includes(node.name)) {
          const data = node.data || (node.data = {});
          const attributes = { ...(node.attributes || {}) };

          // Lấy class phụ nếu bạn có viết kiểu :::wide{.extra-class}
          const extraClasses = attributes.class
            ? attributes.class.split(" ")
            : [];

          // Xóa thuộc tính 'class' dạng chuỗi để tránh xung đột
          delete attributes.class;

          data.hName = "div";
          data.hProperties = {
            ...attributes,
            // HAST CHUẨN: Bắt buộc dùng 'className' và truyền vào một MẢNG
            className: [node.name, ...extraClasses].filter(Boolean),
          };
        }
      }
    });
  };
};

export default remarkGridColumnClass;
