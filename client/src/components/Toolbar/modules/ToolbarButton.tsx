import React from "react";
import { Tooltip } from "antd";
import { cn } from "./cn";
import { styles } from "../styles";

type ToolbarButtonProps = {
  icon: React.ReactNode;
  title: string;
  active?: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
};

export function ToolbarButton({ icon, title, active, onMouseDown }: ToolbarButtonProps) {
  return (
    <Tooltip title={title}>
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          onMouseDown(e);
        }}
        className={cn(
          styles.iconButton.base,
          active ? styles.iconButton.active : styles.iconButton.inactive,
        )}
      >
        {icon}
      </button>
    </Tooltip>
  );
}
