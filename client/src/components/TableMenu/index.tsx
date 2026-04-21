import React from "react";
import {
  addRow,
  deleteRow,
  addColumn,
  deleteColumn,
  deleteTable,
} from "../../core/plugins/modules/table";
import { TableEditor } from "slate-table";
import { Dropdown, MenuProps } from "antd";

export default function TableMenu({ editor, contextMenu, setContextMenu }) {
  const tableMenuItems: MenuProps["items"] = [
    {
      key: "merge-cells",
      label: "合并单元格",
      disabled: !TableEditor.canMerge(editor),
      onClick: () => {
        TableEditor.merge(editor);
        setContextMenu(null);
      },
    },
    {
      key: "split-cells",
      label: "拆分单元格",
      onClick: () => {
        TableEditor.split(editor);
        setContextMenu(null);
      },
    },
    { type: "divider" },
    {
      key: "add-row-above",
      label: "在上方插入行",
      onClick: () => {
        addRow(editor, "above");
        setContextMenu(null);
      },
    },
    {
      key: "add-row-below",
      label: "在下方插入行",
      onClick: () => {
        addRow(editor, "below");
        setContextMenu(null);
      },
    },
    { type: "divider" },
    {
      key: "add-col-left",
      label: "在左侧插入列",
      onClick: () => {
        addColumn(editor, "left");
        setContextMenu(null);
      },
    },
    {
      key: "add-col-right",
      label: "在右侧插入列",
      onClick: () => {
        addColumn(editor, "right");
        setContextMenu(null);
      },
    },
    { type: "divider" },
    {
      key: "delete-row",
      label: "删除行",
      danger: true,
      onClick: () => {
        deleteRow(editor);
        setContextMenu(null);
      },
    },
    {
      key: "delete-col",
      label: "删除列",
      danger: true,
      onClick: () => {
        deleteColumn(editor);
        setContextMenu(null);
      },
    },
    { type: "divider" },
    {
      key: "delete-table",
      label: "删除表格",
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
          className="fixed z-[100] py-2 min-w-[180px] animate-in fade-in zoom-in duration-200"
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
