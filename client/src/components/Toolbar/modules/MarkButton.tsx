import React from "react";
import { useSlate } from "slate-react";
import { Button, Tooltip } from "antd";
import { styles } from "../styles";
import { cn } from "./cn";
import { isMarkActive, toggleMark } from "./toolbar-editor";

type MarkButtonProps = {
  format: string;
  icon: React.ReactNode;
  title: string;
};

export function MarkButton({ format, icon, title }: MarkButtonProps) {
  const editor = useSlate();
  const active = isMarkActive(editor, format);

  return (
    <Tooltip title={title}>
      <Button
        type="text"
        icon={icon}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleMark(editor, format);
        }}
        className={cn(
          styles.iconButton.base,
          active ? styles.iconButton.active : styles.iconButton.inactive,
        )}
      />
    </Tooltip>
  );
}
