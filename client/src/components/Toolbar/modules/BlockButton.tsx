import React from "react";
import { useSlate } from "slate-react";
import { ToolbarButton } from "./ToolbarButton";
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
    <ToolbarButton
      icon={icon}
      title={title}
      active={active}
      onMouseDown={() => toggleBlock(editor, format)}
    />
  );
}
