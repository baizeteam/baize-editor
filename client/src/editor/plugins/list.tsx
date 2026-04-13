import React from 'react';
import { Editor, Transforms, Element as SlateElement } from 'slate';
import { RenderElementProps } from 'slate-react';
import { EditorPlugin } from './base';

export const ListPlugin: EditorPlugin = {
  name: 'list',
  renderElement: ({ attributes, children, element }) => {
    switch (element.type) {
      case 'bulleted-list':
        return <ul {...attributes} className="list-disc list-inside mb-4 space-y-1">{children}</ul>;
      case 'numbered-list':
        return <ol {...attributes} className="list-decimal list-inside mb-4 space-y-1">{children}</ol>;
      case 'list-item':
        return <li {...attributes} className="leading-relaxed">{children}</li>;
      default:
        return undefined;
    }
  },
};

export const toggleList = (editor: Editor, format: 'bulleted-list' | 'numbered-list') => {
  const isActive = isListActive(editor, format);
  const isList = format === 'bulleted-list' || format === 'numbered-list';

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      (n.type === 'bulleted-list' || n.type === 'numbered-list'),
    split: true,
  });

  const newProperties: Partial<SlateElement> = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  };
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const isListActive = (editor: Editor, format: string) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Editor.nodes(editor, {
    at: Editor.unhangRange(editor, selection),
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      n.type === format,
  });

  return !!match;
};
