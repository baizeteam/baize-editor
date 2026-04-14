import React, { FC } from "react";
import {
  RenderElementProps,
  useSlateSelection,
  useSlateStatic,
} from "slate-react";
import { Editor, NodeEntry } from "slate";
import { TableCursor, TableEditor } from "slate-table";
import { EditorPlugin } from "./base";
import { TableCellElement } from "../types";

const Table: FC<RenderElementProps & { className: string }> = ({
  attributes,
  children,
  className,
}) => {
  const editor = useSlateStatic();
  useSlateSelection();
  const [isSelecting] = TableCursor.selection(editor);
  return (
    <table
      className={`${!!isSelecting ? "table-selection-none" : ""} ${className}`}
      {...attributes}
    >
      {children}
    </table>
  );
};

const Th: FC<RenderElementProps & { className: string }> = ({
  attributes,
  children,
  className,
  element,
}) => {
  if (element.type !== "header-cell") {
    throw new Error('Element "Th" must be of type "header-cell"');
  }

  useSlateSelection();
  const editor = useSlateStatic();
  const selected = TableCursor.isSelected(editor, element);

  return (
    <th
      className={`${selected ? "bg-primary-container" : ""} ${className}`}
      rowSpan={element.rowSpan}
      colSpan={element.colSpan}
      {...attributes}
    >
      {children}
    </th>
  );
};

const Td: FC<RenderElementProps & { className: string }> = ({
  attributes,
  children,
  className,
  element,
}) => {
  if (element.type !== "table-cell") {
    throw new Error('Element "Td" must be of type "table-cell"');
  }

  useSlateSelection();
  const editor = useSlateStatic();
  const selected = TableCursor.isSelected(editor, element);

  return (
    <td
      className={`${selected ? "bg-primary-container" : ""} ${className}`}
      rowSpan={element.rowSpan}
      colSpan={element.colSpan}
      {...attributes}
    >
      {children}
    </td>
  );
};

export const TablePlugin: EditorPlugin = {
  name: "table",
  renderElement: (props: RenderElementProps) => {
    switch (props.element.type) {
      case "table":
        return (
          <Table
            className="table-fixed my-4 sm:w-1/2 w-full text-center"
            {...props}
          />
        );
      case "table-header":
        return (
          <thead
            className="border-b text-sm uppercase bg-slate-100"
            {...props.attributes}
          >
            {props.children}
          </thead>
        );
      case "table-body":
        return (
          <tbody className="border-b text-sm" {...props.attributes}>
            {props.children}
          </tbody>
        );
      case "table-footer":
        return (
          <tfoot className="" {...props.attributes}>
            {props.children}
          </tfoot>
        );
      case "table-row":
        return <tr {...props.attributes}>{props.children}</tr>;
      case "header-cell":
        return (
          <Th className="border border-gray-400 p-2 align-middle	" {...props} />
        );
      case "table-cell":
        return (
          <Td className="border border-gray-400 p-2 align-middle	" {...props} />
        );
      default:
        return undefined;
    }
  },
};

export const insertTable = (editor: any, rows = 2, cols = 2) => {
  TableEditor.insertTable(editor, { rows, cols });
};

export const addRow = (editor: any, direction: "above" | "below") => {
  TableEditor.insertRow(editor, { before: direction === "above" });
};

export const deleteRow = (editor: any) => {
  TableEditor.removeRow(editor);
};

export const addColumn = (editor: any, direction: "left" | "right") => {
  TableEditor.insertColumn(editor, { before: direction === "left" });
};

export const deleteColumn = (editor: any) => {
  TableEditor.removeColumn(editor);
};

export const deleteTable = (editor: any) => {
  TableEditor.removeTable(editor);
};
