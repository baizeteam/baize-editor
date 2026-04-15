import React from "react";
import { Button, ColorPicker, Popover, Tooltip } from "antd";
import type { Color } from "antd/es/color-picker";
import { BgColorsOutlined } from "@ant-design/icons";
import { useSlate } from "slate-react";
import { Editor } from "slate";
import { styles } from "./styles";

const PRESET_COLORS = [
  "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e",
  "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1",
  "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#000000", "#374151",
  "#6b7280", "#9ca3af", "#d1d5db", "#f3f4f6", "#ffffff", "#0053db",
];

export interface ColorPickerButtonProps {
  title: string;
  format: "color" | "backgroundColor";
  defaultColor: string;
}

export const ColorPickerButton: React.FC<ColorPickerButtonProps> = ({
  title,
  format,
  defaultColor,
}) => {
  const editor = useSlate();
  const [open, setOpen] = React.useState(false);
  const [currentColor, setCurrentColor] = React.useState(defaultColor);

  const getColor = () => {
    const marks = Editor.marks(editor);
    return (marks as any)?.[format] || defaultColor;
  };

  const handleChange = (color: Color) => {
    const hex = color.toHexString();
    Editor.addMark(editor, format, hex);
    setCurrentColor(hex);
  };

  const handleClear = () => {
    Editor.removeMark(editor, format);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setCurrentColor(getColor());
    }
  };

  return (
    <Popover
      content={
        <div className={styles.popoverContent.colorPicker}>
          <div className={styles.popoverContent.colorLabel}>
            {title}
          </div>
          <ColorPicker
            value={currentColor}
            presets={[{ label: "预设", colors: PRESET_COLORS }]}
            showText
            onChange={handleChange}
          />
          <Button size="small" onClick={handleClear}>
            清除颜色
          </Button>
        </div>
      }
      title={title}
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Tooltip title={title}>
        <Button
          type="text"
          icon={
            format === "color" ? (
              <span className="flex items-center justify-center">
                <span
                  className={styles.colorSwatch}
                  style={{ backgroundColor: getColor() }}
                />
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <BgColorsOutlined
                  style={{
                    color: getColor(),
                    backgroundColor: getColor() === "#ffffff" ? "#eee" : "transparent",
                    padding: "2px",
                    borderRadius: "2px",
                    border: "1px solid #ddd",
                  }}
                />
              </span>
            )
          }
          onMouseDown={(e) => e.preventDefault()}
          className={styles.colorPickerButton}
        />
      </Tooltip>
    </Popover>
  );
};
