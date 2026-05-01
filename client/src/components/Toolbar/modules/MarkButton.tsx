import React from "react";
import { useSlate } from "slate-react";
import { ToolbarButton } from "./ToolbarButton";
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
    <ToolbarButton
      icon={icon}
      title={title}
      active={active}
      onMouseDown={() => toggleMark(editor, format)}
    />
  );
}
