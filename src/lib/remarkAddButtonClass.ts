import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';

export default function remarkAddButtonClass(): (tree: Root) => void {
  return function (tree) {
    console.log('remark working')
    visit(tree, 'paragraph', (node) => {
      node.data = node.data || {};
      node.data.hProperties = node.data.hProperties || {};
      node.data.hProperties.className = ['button'];
    });

    visit(tree, 'blockquote', (node) => {
      node.data = node.data || {};
      node.data.hProperties = node.data.hProperties || {};
      node.data.hProperties.className = ['button'];
    });

    // Thêm các loại node khác nếu cần: heading, list, code, v.v.
  };
}
