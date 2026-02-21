import { visit } from "unist-util-visit";
import { themeConfig } from "../config.ts";

export default function rehypeImageProcessor() {
  return (tree) => {
    let firstImg = true;

    visit(tree, "element", (node) => {
      // 1. Chỉ săn lùng thẻ img
      if (node.tagName !== "img") return;

      // 2. Lấy class hiện tại và gộp chuẩn
      let imgClasses = [];
      if (Array.isArray(node.properties?.className))
        imgClasses.push(...node.properties.className);
      else if (typeof node.properties?.className === "string")
        imgClasses.push(...node.properties.className.split(" "));
      if (Array.isArray(node.properties?.class))
        imgClasses.push(...node.properties.class);
      else if (typeof node.properties?.class === "string")
        imgClasses.push(...node.properties.class.split(" "));

      // 3. CHỐNG LẶP VÔ TẬN: Nếu ảnh đã được xử lý rồi thì bỏ qua
      if (imgClasses.includes("img-placeholder")) return;

      const alt = String(node.properties?.alt || "").trim();
      if (!alt || alt.includes("_")) return;

      // ==========================================
      // KỸ THUẬT ĐỘT BIẾN TẠI CHỖ (IN-PLACE MUTATION)
      // ==========================================

      // A. Lưu lại toàn bộ thuộc tính của ảnh cũ
      const imgProps = { ...node.properties };
      delete imgProps.class;

      // B. Tạo một thẻ img mới hoàn chỉnh bên trong bộ nhớ
      const newImgNode = {
        type: "element",
        tagName: "unpic-img",
        properties: {
          ...imgProps,
          "data-preview": themeConfig?.post?.imageViewer ? "true" : "false",
          loading: "lazy",
          decoding: "async",
          fetchpriority: firstImg ? "high" : "auto",
          className: [...new Set([...imgClasses, "img-placeholder"])].filter(
            Boolean,
          ),
        },
        children: [],
      };
      firstImg = false;

      // C. Tạo thẻ figcaption
      const figcaptionNode = {
        type: "element",
        tagName: "figcaption",
        properties: { className: ["img-caption"] },
        children: [{ type: "text", value: alt }],
      };

      // D. BIẾN HÌNH: Ép bản thân thẻ hiện tại (đang là img) trở thành figure
      node.tagName = "figure";
      node.properties = { className: ["image-caption-wrapper"] };

      // Nhét img và figcaption vào bụng nó
      node.children = [newImgNode, figcaptionNode];
    });
  };
}
