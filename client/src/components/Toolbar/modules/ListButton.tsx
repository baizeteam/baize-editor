import React from "react";
import { useSlate } from "slate-react";
import { toggleList } from "../../../core/plugins/modules/list";
import { ToolbarButton } from "./ToolbarButton";
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
    <ToolbarButton
      icon={icon}
      title={title}
      active={active}
      onMouseDown={() => toggleList(editor, format)}
    />
  );
}
