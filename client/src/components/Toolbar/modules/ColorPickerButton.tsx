import React from "react";
import { HexColorPicker } from "react-colorful";
import { Button } from "../../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Baseline, PaintBucket } from "lucide-react";
import { useSlate } from "slate-react";
import { Editor } from "slate";
import { styles } from "../styles";

const PRESET_COLORS = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#10b981",
  "#14b8a6",
  "#06b6d4",
  "#0ea5e9",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#d946ef",
  "#ec4899",
  "#000000",
  "#374151",
  "#6b7280",
  "#9ca3af",
  "#d1d5db",
  "#f3f4f6",
  "#ffffff",
  "#0053db",
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

  const handleChange = (hex: string) => {
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
    <Popover open={open} onOpenChange={handleOpenChange}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={styles.colorPickerButton}
              onMouseDown={(e) => e.preventDefault()}
            >
              {format === "color" ? (
                <Baseline
                  size={16}
                  style={{
                    color: getColor(),
                    filter:
                      getColor() === "#ffffff"
                        ? "drop-shadow(0 0 1px rgba(0,0,0,0.5))"
                        : undefined,
                  }}
                />
              ) : (
                <span className="flex items-center justify-center">
                  <span
                    className="flex items-center justify-center rounded border border-gray-300 p-0.5"
                    style={{ backgroundColor: getColor() }}
                  >
                    <PaintBucket size={16} style={{ color: "#000000" }} />
                  </span>
                </span>
              )}
            </button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>{title}</TooltipContent>
      </Tooltip>
      <PopoverContent className="w-auto p-3">
        <div className={styles.popoverContent.colorPicker}>
          <div className={styles.popoverContent.colorLabel}>{title}</div>
          <HexColorPicker color={currentColor} onChange={handleChange} />
          <div className="flex flex-wrap gap-1 mt-2">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                className="w-5 h-5 rounded border border-gray-300 cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => handleChange(color)}
              />
            ))}
          </div>
          <Button size="sm" variant="outline" onClick={handleClear}>
            清除颜色
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
