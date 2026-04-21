import React from 'react';
import { RenderLeafProps } from 'slate-react';
import { EditorPlugin } from './base';

export const ColorPlugin: EditorPlugin = {
  name: 'color',
  renderLeaf: ({ attributes, children, leaf }) => {
    const textLeaf = leaf as any;
    const style: React.CSSProperties = {};

    if (textLeaf.color) {
      style.color = textLeaf.color;
    }

    if (textLeaf.backgroundColor) {
      style.backgroundColor = textLeaf.backgroundColor;
    }

    if (Object.keys(style).length === 0) {
      return undefined;
    }

    return (
      <span {...attributes} style={style}>
        {children}
      </span>
    );
  },
};
