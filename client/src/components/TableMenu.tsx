import React from "react";
import {
  TablePlugin,
  addRow,
  deleteRow,
  addColumn,
  deleteColumn,
  deleteTable,
  mergeCells,
} from "../editor/plugins/table";
import { Dropdown, MenuProps } from "antd";

export default function TableMenu({ editor, contextMenu, setContextMenu }) {
  const tableMenuItems: MenuProps["items"] = [
    {
      key: "merge-cells",
      label: "Merge Cells",
      onClick: () => {
        mergeCells(editor);
        setContextMenu(null);
      },
    },
    { type: "divider" },
    {
      key: "add-row-above",
      label: "Insert Row Above",
      onClick: () => {
        addRow(editor, "above");
        setContextMenu(null);
      },
    },
    {
      key: "add-row-below",
      label: "Insert Row Below",
      onClick: () => {
        addRow(editor, "below");
        setContextMenu(null);
      },
    },
    { type: "divider" },
    {
      key: "add-col-left",
      label: "Insert Column Left",
      onClick: () => {
        addColumn(editor, "left");
        setContextMenu(null);
      },
    },
    {
      key: "add-col-right",
      label: "Insert Column Right",
      onClick: () => {
        addColumn(editor, "right");
        setContextMenu(null);
      },
    },
    { type: "divider" },
    {
      key: "delete-row",
      label: "Delete Row",
      danger: true,
      onClick: () => {
        deleteRow(editor);
        setContextMenu(null);
      },
    },
    {
      key: "delete-col",
      label: "Delete Column",
      danger: true,
      onClick: () => {
        deleteColumn(editor);
        setContextMenu(null);
      },
    },
    { type: "divider" },
    {
      key: "delete-table",
      label: "Delete Table",
      danger: true,
      onClick: () => {
        deleteTable(editor);
        setContextMenu(null);
      },
    },
  ];
  return (
    <>
      {contextMenu && contextMenu.visible && (
        <div
          className="fixed z-[100] bg-white shadow-2xl rounded-xl border border-outline-variant/20 py-2 min-w-[180px] animate-in fade-in zoom-in duration-200"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <Dropdown
            menu={{ items: tableMenuItems }}
            open={true}
            trigger={["contextMenu"]}
            onOpenChange={(open) => !open && setContextMenu(null)}
          >
            <div />
          </Dropdown>
        </div>
      )}
    </>
  );
}
