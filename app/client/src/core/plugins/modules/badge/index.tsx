import { Editor, Transforms, Element as SlateElement, Path } from "slate";
import { RenderElementProps } from "slate-react";
import { EditorPlugin } from "../base";

export const BadgePlugin: EditorPlugin = {
  name: "badge",
  renderElement: ({ attributes, children, element }: RenderElementProps) => {
    if (element.type === "badge") {
      return (
        <span
          {...attributes}
          className="bg-primary-container text-on-primary-container font-bold px-2 py-0.5 rounded uppercase tracking-widest"
        >
          {children}
        </span>
      );
    }
    return undefined;
  },
  onKeyDown: (event, editor) => {
    if (event.key !== "Backspace" || !editor.selection) return;

    const [match] = Editor.nodes(editor, {
      match: (n) => SlateElement.isElement(n) && n.type === "badge",
    });

    if (!match) return;

    const [, badgePath] = match;
    const { anchor } = editor.selection;

    // Cursor right after a badge: [text ""](cursor)|badge|
    if (
      anchor.offset === 0 &&
      Path.equals(anchor.path.slice(0, -1), Path.next(badgePath))
    ) {
      event.preventDefault();
      Transforms.removeNodes(editor, { at: badgePath });
      return;
    }

    // Cursor inside a badge
    if (Path.isDescendant(anchor.path, badgePath)) {
      const badgeNode = match[0] as SlateElement;
      const text = Editor.string(editor, badgePath);

      // Empty badge → remove it
      if (text === "") {
        event.preventDefault();
        Transforms.removeNodes(editor, { at: badgePath });
        return;
      }

      // At start of badge with content → delete entire badge
      if (anchor.offset === 0) {
        event.preventDefault();
        Transforms.removeNodes(editor, { at: badgePath });
        return;
      }
    }
  },
};
