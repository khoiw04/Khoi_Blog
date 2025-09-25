import { visit } from 'unist-util-visit';

export default function remarkAdmonitions() {
  return (tree) => {
    visit(tree, 'containerDirective', (node) => {
      const type = node.name;
      let label = type.charAt(0).toUpperCase() + type.slice(1);

      const firstParagraph = node.children[0];
      if (
        firstParagraph?.type === 'paragraph' &&
        firstParagraph.children?.[0]?.type === 'text'
      ) {
        const firstText = firstParagraph.children[0].value.trim();
        if (firstText.length < 30) {
          label = firstText;
          node.children.shift();
        }
      }

      const data = node.data || (node.data = {});
      data.hName = 'div';
      data.hProperties = {
        className: ['admonition', `admonition-${type}`],
      };

      node.children.unshift({
        type: 'paragraph',
        data: {
          hName: 'p',
          hProperties: { className: 'admonition-title' },
        },
        children: [{ type: 'text', value: label }],
      });
    });
  };
}
