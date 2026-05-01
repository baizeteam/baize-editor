import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type ParagraphElement = {
  type: "paragraph";
  align?: "left" | "center" | "right" | "justify";
  children: CustomText[];
};

export type HeadingElement = {
  type:
    | "heading-one"
    | "heading-two"
    | "heading-three"
    | "heading-four"
    | "heading-five"
    | "heading-six";
  align?: "left" | "center" | "right" | "justify";
  children: CustomText[];
};

export type BlockQuoteElement = {
  type: "block-quote";
  children: CustomText[];
};

export type ImageElement = {
  type: "image";
  url: string;
  width?: number;
  children: EmptyText[];
};

export type BulletedListElement = {
  type: "bulleted-list";
  children: ListItemElement[];
};

export type NumberedListElement = {
  type: "numbered-list";
  children: ListItemElement[];
};

export type ListItemElement = {
  type: "list-item";
  children: CustomText[];
};

export type TableElement = {
  type: "table";
  children: TableSectionElement[];
};

export type TableRowElement = {
  type: "table-row";
  children: TableCellElement[];
};

export type TableCellElement = {
  type: "table-cell" | "header-cell";
  rowSpan?: number;
  colSpan?: number;
  children: CustomText[];
};

export type TableSectionElement = {
  type: "table-header" | "table-body" | "table-footer";
  children: TableRowElement[];
};

export type CustomElement =
  | ParagraphElement
  | HeadingElement
  | BlockQuoteElement
  | ImageElement
  | TableElement
  | TableRowElement
  | TableCellElement
  | TableSectionElement
  | BulletedListElement
  | NumberedListElement
  | ListItemElement;

export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  badge?: boolean;
  color?: string;
  backgroundColor?: string;
};

export type EmptyText = {
  text: "";
};

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText | EmptyText;
  }
}
