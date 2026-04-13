import React from "react";
import { RenderElementProps } from "slate-react";
import {
  Editor,
  Transforms,
  Element as SlateElement,
  Range,
  Point,
  Path,
} from "slate";
import { EditorPlugin } from "./base";

export const TablePlugin: EditorPlugin = {
  name: "table",
  withPlugin: (editor) => {
    const { deleteBackward, deleteForward } = editor;

    editor.deleteBackward = (unit: any) => {
      const { selection } = editor;
      if (selection && Range.isCollapsed(selection)) {
        const [cell] = Editor.nodes(editor, {
          match: (n) => SlateElement.isElement(n) && n.type === "table-cell",
        });

        if (cell) {
          const [, path] = cell;
          const start = Editor.start(editor, path);
          if (Point.equals(selection.anchor, start)) return;
        }
      }
      deleteBackward(unit);
    };

    editor.deleteForward = (unit: any) => {
      const { selection } = editor;
      if (selection && Range.isCollapsed(selection)) {
        const [cell] = Editor.nodes(editor, {
          match: (n) => SlateElement.isElement(n) && n.type === "table-cell",
        });

        if (cell) {
          const [, path] = cell;
          const end = Editor.end(editor, path);
          if (Point.equals(selection.focus, end)) return;
        }
      }
      deleteForward(unit);
    };

    return editor;
  },
  renderElement: ({ attributes, children, element }) => {
    const cellElement = element as any;
    switch (element.type) {
      case "table":
        return (
          <div className="overflow-x-auto my-6">
            <table
              {...attributes}
              className="w-full border-collapse border border-outline-variant/30 rounded-lg overflow-hidden"
            >
              <tbody className="bg-white">{children}</tbody>
            </table>
          </div>
        );
      case "table-row":
        return (
          <tr
            {...attributes}
            className="border-b border-outline-variant/20 last:border-0"
          >
            {children}
          </tr>
        );
      case "table-cell":
        return (
          <td
            {...attributes}
            rowSpan={cellElement.rowSpan || 1}
            colSpan={cellElement.colSpan || 1}
            className="p-3 border-r border-outline-variant/20 last:border-0 text-sm"
          >
            {children}
          </td>
        );
      default:
        return undefined;
    }
  },
};

// Helper functions for table manipulation
export const getTableInfo = (editor: Editor) => {
  if (!editor.selection) return null;
  const [cellMatch] = Editor.nodes(editor, {
    match: (n) => SlateElement.isElement(n) && n.type === "table-cell",
  });
  const [rowMatch] = Editor.nodes(editor, {
    match: (n) => SlateElement.isElement(n) && n.type === "table-row",
  });
  const [tableMatch] = Editor.nodes(editor, {
    match: (n) => SlateElement.isElement(n) && n.type === "table",
  });

  if (!cellMatch || !rowMatch || !tableMatch) return null;

  return {
    cellPath: cellMatch[1],
    rowPath: rowMatch[1],
    tablePath: tableMatch[1],
    table: tableMatch[0] as any,
  };
};

export const addRow = (editor: Editor, direction: "above" | "below") => {
  const info = getTableInfo(editor);
  if (!info) return;
  const { rowPath, table } = info;
  const newIndex =
    direction === "above"
      ? rowPath[rowPath.length - 1]
      : rowPath[rowPath.length - 1] + 1;

  const newRow: any = {
    type: "table-row",
    children: table.children[0].children.map(() => ({
      type: "table-cell",
      children: [{ text: "" }],
    })),
  };

  Transforms.insertNodes(editor, newRow, { at: [...info.tablePath, newIndex] });
};

export const deleteRow = (editor: Editor) => {
  const info = getTableInfo(editor);
  if (!info) return;
  if (info.table.children.length <= 1) return;
  Transforms.removeNodes(editor, { at: info.rowPath });
};

export const addColumn = (editor: Editor, direction: "left" | "right") => {
  const info = getTableInfo(editor);
  if (!info) return;
  const { cellPath, tablePath, table } = info;
  const colIndex = cellPath[cellPath.length - 1];
  const newIndex = direction === "left" ? colIndex : colIndex + 1;

  table.children.forEach((row: any, i: number) => {
    const newCell: any = { type: "table-cell", children: [{ text: "" }] };
    Transforms.insertNodes(editor, newCell, {
      at: [...tablePath, i, newIndex],
    });
  });
};

export const deleteColumn = (editor: Editor) => {
  const info = getTableInfo(editor);
  if (!info) return;
  const { cellPath, tablePath, table } = info;
  const colIndex = cellPath[cellPath.length - 1];
  if (table.children[0].children.length <= 1) return;

  table.children.forEach((_: any, i: number) => {
    Transforms.removeNodes(editor, { at: [...tablePath, i, colIndex] });
  });
};

export const deleteTable = (editor: Editor) => {
  const info = getTableInfo(editor);
  if (!info) return;
  Transforms.removeNodes(editor, { at: info.tablePath });
};

export const mergeCells = (editor: Editor) => {
  const { selection } = editor;
  if (!selection || Range.isCollapsed(selection)) return;

  const cells = Array.from(
    Editor.nodes(editor, {
      at: selection,
      match: (n) => SlateElement.isElement(n) && n.type === "table-cell",
    }),
  );

  if (cells.length < 2) return;

  // Get the first cell (top-left)
  const [firstCell, firstPath] = cells[0];

  // Check if all selected cells are in the same row
  const firstRowPath = firstPath.slice(0, -1);
  const sameRow = cells.every(([, path]) =>
    Path.equals(path.slice(0, -1), firstRowPath),
  );

  if (sameRow) {
    // Horizontal merge
    const totalColSpan = cells.reduce(
      (acc, [cell]) => acc + ((cell as any).colSpan || 1),
      0,
    );

    // Update the first cell's colSpan
    Transforms.setNodes(editor, { colSpan: totalColSpan } as any, {
      at: firstPath,
    });

    // Remove the other cells (in reverse order to keep paths valid)
    const pathsToRemove = cells
      .slice(1)
      .map(([, path]) => path)
      .sort((a, b) => Path.compare(b, a));
    for (const path of pathsToRemove) {
      Transforms.removeNodes(editor, { at: path });
    }
  } else {
    // Vertical merge or complex merge is not supported in this basic version
    // We'll just merge the content into the first cell and remove others for now
    // to provide a basic "merge" experience.
    console.warn("Vertical merging is not fully supported in this version.");

    // Basic fallback: merge all into first cell horizontally if possible, or just remove
    // For now, let's just stick to horizontal merge as it's the most common and safest.
  }
};
