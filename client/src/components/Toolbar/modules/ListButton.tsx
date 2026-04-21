import React from "react";
import { useSlate } from "slate-react";
import { Button, Tooltip } from "antd";
import { toggleList } from "../../../core/plugins/list";
import { styles } from "../styles";
import { cn } from "./cn";
import { isBlockActive } from "./toolbar-editor";

type ListButtonProps = {
  format: "bulleted-list" | "numbered-list";
  icon: React.ReactNode;
  title: string;
};

export function ListButton({ format, icon, title }: ListButtonProps) {
  const editor = useSlate();
  const active = isBlockActive(editor, format);

  return (
    <Tooltip title={title}>
      <Button
        type="text"
        shape="circle"
        icon={icon}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleList(editor, format);
        }}
        className={cn(
          styles.listButton.base,
          active ? styles.listButton.active : styles.listButton.inactive,
        )}
      />
    </Tooltip>
  );
}
