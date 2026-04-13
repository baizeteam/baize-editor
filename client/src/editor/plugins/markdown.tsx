import { Editor, Transforms, Element as SlateElement, Text } from "slate";
import { EditorPlugin } from "./base";

const getCurrentLineStart = (editor: Editor): string => {
  const { selection } = editor;
  if (!selection) return "";

  const [node] = Editor.node(editor, selection.anchor);
  if (!Text.isText(node)) return "";

  const text = node.text;
  const lineStart = text.lastIndexOf("\n", selection.anchor.offset - 1) + 1;
  return text.slice(lineStart, selection.anchor.offset);
};

export const MarkdownPlugin: EditorPlugin = {
  name: "markdown",
  onKeyDown: (event, editor) => {
    if (!editor.selection) return;

    const currentLineStart = getCurrentLineStart(editor);

    if (event.key === "Enter") {
      const headingTypes: string[] = ["heading-one", "heading-two", "heading-three", "heading-four", "heading-five", "heading-six"];
      const headingPrefixes = ["#", "##", "###", "####", "#####", "######"];
      for (let i = 0; i < headingPrefixes.length; i++) {
        if (currentLineStart === headingPrefixes[i]) {
          event.preventDefault();
          Transforms.setNodes(editor, { type: headingTypes[i] as any });
          Transforms.delete(editor, {
            distance: headingPrefixes[i].length,
            unit: "character",
            reverse: true,
          });
          return;
        }
      }

      if (currentLineStart === ">") {
        event.preventDefault();
        Transforms.setNodes(editor, { type: "block-quote" });
        Transforms.delete(editor, {
          distance: 1,
          unit: "character",
          reverse: true,
        });
        return;
      }

      if (currentLineStart === "-") {
        event.preventDefault();
        Transforms.setNodes(editor, { type: "list-item" });
        const listNode: SlateElement = { type: "bulleted-list", children: [] };
        Transforms.wrapNodes(editor, listNode);
        Transforms.delete(editor, {
          distance: 1,
          unit: "character",
          reverse: true,
        });
        return;
      }

      const digitMatch = currentLineStart.match(/^(\d+)$/);
      if (digitMatch) {
        event.preventDefault();
        Transforms.setNodes(editor, { type: "list-item" });
        const listNode: SlateElement = { type: "numbered-list", children: [] };
        Transforms.wrapNodes(editor, listNode);
        Transforms.insertText(editor, ". ");
        return;
      }
    }

    if (event.key === " " && currentLineStart) {
      const headingTypes: string[] = ["heading-one", "heading-two", "heading-three", "heading-four", "heading-five", "heading-six"];
      const headingPrefixes = ["#", "##", "###", "####", "#####", "######"];
      for (let i = 0; i < headingPrefixes.length; i++) {
        if (currentLineStart === headingPrefixes[i]) {
          event.preventDefault();
          Transforms.setNodes(editor, { type: headingTypes[i] as any });
          Transforms.delete(editor, {
            distance: headingPrefixes[i].length,
            unit: "character",
            reverse: true,
          });
          return;
        }
      }

      if (currentLineStart === ">") {
        event.preventDefault();
        Transforms.setNodes(editor, { type: "block-quote" as any });
        Transforms.delete(editor, {
          distance: 1,
          unit: "character",
          reverse: true,
        });
        return;
      }

      if (currentLineStart === "-") {
        event.preventDefault();
        Transforms.setNodes(editor, { type: "list-item" as any });
        const listNode: SlateElement = { type: "bulleted-list", children: [] };
        Transforms.wrapNodes(editor, listNode);
        Transforms.delete(editor, {
          distance: 1,
          unit: "character",
          reverse: true,
        });
        return;
      }

      const digitMatch = currentLineStart.match(/^(\d+)$/);
      if (digitMatch) {
        event.preventDefault();
        Transforms.setNodes(editor, { type: "list-item" as any });
        const listNode: SlateElement = { type: "numbered-list", children: [] };
        Transforms.wrapNodes(editor, listNode);
        Transforms.insertText(editor, ". ");
        return;
      }
    }
  },
};
