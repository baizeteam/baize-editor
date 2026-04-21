import { Editor, Transforms, Element as SlateElement } from "slate";
import type { MenuProps } from "antd";

export function isMarkActive(editor: Editor, format: string): boolean {
  const marks = Editor.marks(editor);
  return marks ? (marks as Record<string, boolean>)[format] === true : false;
}

export function isBlockActive(editor: Editor, format: string): boolean {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Editor.nodes(editor, {
    at: Editor.unhangRange(editor, selection),
    match: (n) => SlateElement.isElement(n) && n.type === format,
  });
  return !!match;
}

export function toggleMark(editor: Editor, format: string): void {
  const active = isMarkActive(editor, format);
  if (active) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
}

export function toggleBlock(editor: Editor, format: string): void {
  const active = isBlockActive(editor, format);
  Transforms.setNodes(editor, {
    type: active ? "paragraph" : format,
  } as any);
}

export function getBlockLabel(editor: Editor): string {
  if (isBlockActive(editor, "heading-one")) return "H1";
  if (isBlockActive(editor, "heading-two")) return "H2";
  if (isBlockActive(editor, "heading-three")) return "H3";
  if (isBlockActive(editor, "heading-four")) return "H4";
  if (isBlockActive(editor, "heading-five")) return "H5";
  if (isBlockActive(editor, "heading-six")) return "H6";
  return "正文";
}

export function getCharacterCount(editor: Editor): number {
  return Editor.string(editor, []).length;
}

const HEADING_KEYS = [
  "heading-one",
  "heading-two",
  "heading-three",
  "heading-four",
  "heading-five",
  "heading-six",
  "paragraph",
] as const;

const HEADING_LABELS: Record<(typeof HEADING_KEYS)[number], string> = {
  "heading-one": "标题 1",
  "heading-two": "标题 2",
  "heading-three": "标题 3",
  "heading-four": "标题 4",
  "heading-five": "标题 5",
  "heading-six": "标题 6",
  paragraph: "正文",
};

export function getHeadingMenuItems(editor: Editor): MenuProps["items"] {
  return HEADING_KEYS.map((key) => ({
    key,
    label: HEADING_LABELS[key],
    onClick: () => toggleBlock(editor, key),
  }));
}
