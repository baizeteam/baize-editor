import React from "react";
import { Editor, Transforms, Element as SlateElement } from "slate";
import { RenderElementProps } from "slate-react";
import { EditorPlugin } from "../base";

export const ListPlugin: EditorPlugin = {
  name: "list",
  renderElement: ({ attributes, children, element }) => {
    switch (element.type) {
      case "bulleted-list":
        return (
          <ul {...attributes} className="list-disc list-inside mb-4 space-y-1">
            {children}
          </ul>
        );
      case "numbered-list":
        return (
          <ol
            {...attributes}
            className="list-decimal list-inside mb-4 space-y-1"
          >
            {children}
          </ol>
        );
      case "list-item":
        return (
          <li {...attributes} className="leading-relaxed">
            {children}
          </li>
        );
      default:
        return undefined;
    }
  },
  onKeyDown: (event, editor) => {
    if (event.key !== "Enter") return;
    if (!editor.selection) return;

    const [listItem] = Editor.nodes(editor, {
      match: (n) => SlateElement.isElement(n) && n.type === "list-item",
    });

    if (listItem) {
      const [node] = listItem;
      const listNode = node as any;
      const text = Array.isArray(listNode.children)
        ? listNode.children.map((c: any) => c.text || "").join("")
        : "";

      if (text === "") {
        event.preventDefault();

        const [listParent] = Editor.nodes(editor, {
          match: (n) =>
            SlateElement.isElement(n) &&
            (n.type === "bulleted-list" || n.type === "numbered-list"),
        });

        if (listParent) {
          const [parent] = listParent;
          const parentNode = parent as any;
          const itemCount = Array.isArray(parentNode.children)
            ? parentNode.children.length
            : 0;

          if (itemCount <= 1) {
            Transforms.setNodes(editor, { type: "paragraph" });
            Transforms.unwrapNodes(editor, {
              match: (n) =>
                SlateElement.isElement(n) &&
                (n.type === "bulleted-list" || n.type === "numbered-list"),
            });
          } else {
            Transforms.setNodes(editor, { type: "paragraph" });
          }
        } else {
          Transforms.setNodes(editor, { type: "paragraph" });
        }
      }
    }
  },
};

export const toggleList = (
  editor: Editor,
  format: "bulleted-list" | "numbered-list",
) => {
  const isActive = isListActive(editor, format);
  const isList = format === "bulleted-list" || format === "numbered-list";

  Transforms.unwrapNodes(editor, {
    match: (n: any) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      (n.type === "bulleted-list" || n.type === "numbered-list"),
    split: true,
  });

  const newProperties: Partial<SlateElement> = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
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
    match: (n: any) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};
