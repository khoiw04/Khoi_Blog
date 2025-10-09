import { visit } from 'unist-util-visit';
import type { Root } from 'hast';
import type { Plugin } from 'unified';
import type { VFile } from 'vfile';

const collectionBases: Record<string, string> = {
  vi: '/vi/blog',
  en: '/en/blog'
};

const rehypeAstroRelativeLinks: Plugin<[], Root> = () => {
  return (tree: Root, file: VFile) => {
    const frontmatter = file.data?.astro?.frontmatter;
    const collection = frontmatter?.collection;

    const base = collectionBases[collection];

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
