import React from "react";
import { useSlate } from "slate-react";
import { Button, Tooltip } from "antd";
import { styles } from "../styles";
import { cn } from "./cn";
import { isBlockActive, toggleBlock } from "./toolbar-editor";

type BlockButtonProps = {
  format: string;
  icon: React.ReactNode;
  title: string;
};

export function BlockButton({ format, icon, title }: BlockButtonProps) {
  const editor = useSlate();
  const active = isBlockActive(editor, format);

  return (
    <Tooltip title={title}>
      <Button
        type="text"
        icon={icon}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlock(editor, format);
        }}
        className={cn(
          styles.iconButton.base,
          active ? styles.iconButton.active : styles.iconButton.inactive,
        )}
      />
    </Tooltip>
  );
}
