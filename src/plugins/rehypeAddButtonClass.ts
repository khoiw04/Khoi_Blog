import { visitParents } from 'unist-util-visit-parents';
import type { Root, Element } from 'hast';

export default function rehypeAddButtonClass(): (tree: Root) => void {
  return function (tree) {
    visitParents(tree, 'element', (node: Element, ancestors) => {
      if (!node || typeof node !== 'object') return;

      const targetTags = [
        'p', 'li', 'div', 'ul', 'ol',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'blockquote', 'pre', 'code', 'figure', 'table'
      ];

      const shouldTag = targetTags.includes(node.tagName);

      const isInsideBlockquote = ancestors.some(
        (ancestor) =>
          typeof ancestor === 'object' &&
          'tagName' in ancestor &&
          ancestor.tagName === 'blockquote'
      );

      const isInsideAdmonition = ancestors.some((ancestor) => {
        if (
          typeof ancestor === 'object' &&
          'properties' in ancestor &&
          ancestor.properties &&
          Array.isArray(ancestor.properties.className)
        ) {
          return ancestor.properties.className.some((cls) => {
            if (typeof cls !== 'string') return false;
            return cls === 'admonition' || cls.startsWith('admonition-');
          });
        }
        return false;
      });


      if (shouldTag && !isInsideBlockquote && !isInsideAdmonition) {
        node.properties = node.properties || {};
        if (!Array.isArray(node.properties.className)) {
          node.properties.className = node.properties.className
            ? [String(node.properties.className)]
            : [];
        }
        if (!node.properties.className.includes('button')) {
          node.properties.className.push('button');
        }
      }
    });
  };
}