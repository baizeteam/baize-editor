import React from "react";
import { useSlate } from "slate-react";
import { Transforms } from "slate";
import { Button, Tooltip } from "antd";
import { TableOutlined } from "@ant-design/icons";
import { defaultTable } from "../helper";

export function InsertTableButton() {
  const editor = useSlate();

  return (
    <Tooltip title="插入表格">
      <Button
        type="text"
        shape="circle"
        icon={<TableOutlined />}
        onMouseDown={(e) => {
          e.preventDefault();
          Transforms.insertNodes(editor, defaultTable);
        }}
        className="flex-shrink-0"
      />
    </Tooltip>
  );
}
