import { visit } from 'unist-util-visit';
import type { Root } from 'hast';
import type { Plugin } from 'unified';
import type { VFile } from 'vfile';

interface Options {
  collectionBases: Record<string, string>;
}

const rehypeAstroRelativeLinks: Plugin<[Options], Root> = (options) => {
  const { collectionBases } = options;

  return (tree: Root, file: VFile) => {
    const filePath = file.path || '';
    const match = filePath.match(/\/content\/([^\/]+)\//);
    const collection = match?.[1] ?? 'vi';
    const base = collectionBases[collection] ?? '';

    if (!base) return;

    visit(tree, 'element', (node: any) => {
      if (
        node.tagName === 'a' &&
        typeof node.properties?.href === 'string' &&
        node.properties.href.startsWith('./')
      ) {
        const slug = node.properties.href.replace('./', '');
        node.properties.href = `${base}/${slug}`;
      }
    });
  };
};

export default rehypeAstroRelativeLinks;