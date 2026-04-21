import React from "react";
import { useSlate } from "slate-react";
import { Button, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { styles } from "../styles";
import { getBlockLabel, getHeadingMenuItems } from "./toolbar-editor";

export function HeadingDropdown() {
  const editor = useSlate();

  return (
    <Dropdown menu={{ items: getHeadingMenuItems(editor) }} trigger={["click"]}>
      <Button type="text" className={styles.headingDropdown}>
        <span className={styles.headingLabel}>{getBlockLabel(editor)}</span>
        <DownOutlined className="text-[10px]" />
      </Button>
    </Dropdown>
  );
}
