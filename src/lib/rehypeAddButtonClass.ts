import { visit } from 'unist-util-visit';
import type { Root } from 'hast';

export default function rehypeAddButtonClass(): (tree: Root) => void {
  return function (tree) {
    visit(tree, 'element', (node) => {
      const targetTags = [
        'p', 'li', 'div', 'ul', 'ol',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'blockquote', 'pre', 'code', 'figure', 'table', 'section'
      ];

      const classList = node.properties?.className;
      const isExpressiveCodeFigure =
        node.tagName === 'figure' &&
        ((Array.isArray(classList) && classList.includes('expressive-code')) ||
         (typeof classList === 'string' && classList.includes('expressive-code')));

      const shouldTag = targetTags.includes(node.tagName) || isExpressiveCodeFigure;

      if (shouldTag) {
        node.properties = node.properties || {};
        if (!Array.isArray(node.properties.className)) {
          node.properties.className = node.properties.className
            ? [String(node.properties.className)]
            : [];
        }
        if (!node.properties.className.includes('button')) {
          node.properties.className.push('button');
        }

        if (node.tagName === 'blockquote' && node.children) {
          node.children.forEach((child) => {
            if (child.type === 'element') {
              child.properties = child.properties || {};
              if (!Array.isArray(child.properties.className)) {
                child.properties.className = child.properties.className
                  ? [String(child.properties.className)]
                  : [];
              }
              if (!child.properties.className.includes('button')) {
                child.properties.className.push('button');
              }
            }
          });
        }
      }
    });
  };
}
