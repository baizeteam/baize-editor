import React from "react";
import { useSlate } from "slate-react";
import { Editor, Transforms, Element as SlateElement } from "slate";
import { Button, Tooltip } from "antd";
import { TagOutlined } from "@ant-design/icons";
import { styles } from "../styles";
import { cn } from "./cn";

function isBadgeActive(editor: Editor): boolean {
  const [match] = Editor.nodes(editor, {
    match: (n) => SlateElement.isElement(n) && n.type === "badge",
  });
  return !!match;
}

function toggleBadge(editor: Editor): void {
  const active = isBadgeActive(editor);
  if (active) {
    Transforms.unwrapNodes(editor, {
      match: (n) => SlateElement.isElement(n) && n.type === "badge",
    });
  } else {
    const badge = { type: "badge" as const, children: [] };
    Transforms.wrapNodes(editor, badge, { split: true });
  }
}

export function BadgeButton() {
  const editor = useSlate();
  const active = isBadgeActive(editor);

  return (
    <Tooltip title="徽章">
      <Button
        type="text"
        icon={<TagOutlined />}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBadge(editor);
        }}
        className={cn(
          styles.iconButton.base,
          active ? styles.iconButton.active : styles.iconButton.inactive,
        )}
      />
    </Tooltip>
  );
}
