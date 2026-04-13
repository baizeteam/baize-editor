import React, { useState, useEffect } from "react";
import { Editor, Transforms, Element as SlateElement } from "slate";
import { useSlate } from "slate-react";
import {
  Button,
  Tooltip,
  Dropdown,
  MenuProps,
  Popover,
  Input,
  ColorPicker,
} from "antd";
import type { Color } from "antd/es/color-picker";
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  AlignCenterOutlined,
  AlignLeftOutlined,
  UnorderedListOutlined,
  SendOutlined,
  DownOutlined,
  FontSizeOutlined,
  StrikethroughOutlined,
  TableOutlined,
  OrderedListOutlined,
  PictureOutlined,
  BgColorsOutlined,
} from "@ant-design/icons";
import { Quote } from "lucide-react";
import { toggleList } from "../editor/plugins/list";
import { insertImage } from "../editor/plugins/image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export const Toolbar: React.FC = () => {
  const editor = useSlate();

  const [imageUrl, setImageUrl] = useState("");
  const [imagePopoverVisible, setImagePopoverVisible] = useState(false);

  const isMarkActive = (format: string) => {
    const marks = Editor.marks(editor);
    return marks ? (marks as any)[format] === true : false;
  };

  const isBlockActive = (format: string) => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => SlateElement.isElement(n) && n.type === format,
    });
    return !!match;
  };

  const isListActive = (format: string) => {
    return isBlockActive(format);
  };

  const toggleMark = (format: string) => {
    const isActive = isMarkActive(format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  const toggleBlock = (format: string) => {
    const isActive = isBlockActive(format);
    Transforms.setNodes(editor, {
      type: isActive ? "paragraph" : format,
    } as any);
  };

  const getBlockLabel = () => {
    if (isBlockActive("heading-one")) return "H1";
    if (isBlockActive("heading-two")) return "H2";
    if (isBlockActive("heading-three")) return "H3";
    if (isBlockActive("heading-four")) return "H4";
    if (isBlockActive("heading-five")) return "H5";
    if (isBlockActive("heading-six")) return "H6";
    return "正文";
  };

  const getCharacterCount = () => {
    const text = Editor.string(editor, []);
    return text.length;
  };

  const insertTable = () => {
    const table: any = {
      type: "table",
      children: [
        {
          type: "table-row",
          children: [
            { type: "table-cell", children: [{ text: "" }] },
            { type: "table-cell", children: [{ text: "" }] },
          ],
        },
        {
          type: "table-row",
          children: [
            { type: "table-cell", children: [{ text: "" }] },
            { type: "table-cell", children: [{ text: "" }] },
          ],
        },
      ],
    };
    Transforms.insertNodes(editor, table);
  };

  const getCurrentColor = (format: string): string => {
    const marks = Editor.marks(editor);
    return (marks as any)?.[format] || "#000000";
  };

  const getCurrentBgColor = (): string => {
    const marks = Editor.marks(editor);
    return (marks as any)?.backgroundColor || "#ffffff";
  };

  const handleTextColorChange = (color: Color) => {
    const hex = color.toHexString();
    Editor.addMark(editor, "color", hex);
    setTextColor(hex);
  };

  const handleBgColorChange = (color: Color) => {
    const hex = color.toHexString();
    Editor.addMark(editor, "backgroundColor", hex);
    setBgColor(hex);
  };

  const clearTextColor = () => {
    Editor.removeMark(editor, "color");
  };

  const clearBgColor = () => {
    Editor.removeMark(editor, "backgroundColor");
  };

  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColorOpen, setTextColorOpen] = useState(false);
  const [bgColorOpen, setBgColorOpen] = useState(false);

  useEffect(() => {
    if (!textColorOpen) {
      setTextColor(getCurrentColor("color"));
    }
    if (!bgColorOpen) {
      setBgColor(getCurrentBgColor());
    }
  }, [editor.selection]);

  const headingItems: MenuProps["items"] = [
    {
      key: "heading-one",
      label: "标题 1",
      onClick: () => toggleBlock("heading-one"),
    },
    {
      key: "heading-two",
      label: "标题 2",
      onClick: () => toggleBlock("heading-two"),
    },
    {
      key: "heading-three",
      label: "标题 3",
      onClick: () => toggleBlock("heading-three"),
    },
    {
      key: "heading-four",
      label: "标题 4",
      onClick: () => toggleBlock("heading-four"),
    },
    {
      key: "heading-five",
      label: "标题 5",
      onClick: () => toggleBlock("heading-five"),
    },
    {
      key: "heading-six",
      label: "标题 6",
      onClick: () => toggleBlock("heading-six"),
    },
    {
      key: "paragraph",
      label: "正文",
      onClick: () => toggleBlock("paragraph"),
    },
  ];

  const MarkButton = ({
    format,
    icon,
    title,
  }: {
    format: string;
    icon: React.ReactNode;
    title: string;
  }) => {
    const active = isMarkActive(format);
    return (
      <Tooltip title={title}>
        <Button
          type="text"
          icon={icon}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleMark(format);
          }}
          className={cn(
            "transition-all duration-200 h-8 w-8 flex items-center justify-center rounded-lg",
            active
              ? "text-primary bg-primary/15 hover:bg-primary/25 shadow-sm"
              : "text-on-surface-variant hover:bg-black/5",
          )}
        />
      </Tooltip>
    );
  };

  const BlockButton = ({
    format,
    icon,
    title,
  }: {
    format: string;
    icon: React.ReactNode;
    title: string;
  }) => {
    const active = isBlockActive(format);
    return (
      <Tooltip title={title}>
        <Button
          type="text"
          icon={icon}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlock(format);
          }}
          className={cn(
            "transition-all duration-200 h-8 w-8 flex items-center justify-center rounded-lg",
            active
              ? "text-primary bg-primary/15 hover:bg-primary/25 shadow-sm"
              : "text-on-surface-variant hover:bg-black/5",
          )}
        />
      </Tooltip>
    );
  };

  const saveData = () => {
    console.log(editor.children);
  };

  return (
    <div className="sticky top-0 z-50 w-full flex justify-center pt-8 pb-4 px-4 bg-surface-container-low/80 backdrop-blur-md">
      <div className="max-w-4xl w-full bg-white/90 backdrop-blur-2xl px-6 py-2 rounded-full flex items-center justify-between shadow-sm border border-outline-variant/10">
        <div className="flex items-center gap-1">
          <MarkButton format="bold" icon={<BoldOutlined />} title="粗体" />
          <MarkButton format="italic" icon={<ItalicOutlined />} title="斜体" />
          <MarkButton
            format="underline"
            icon={<UnderlineOutlined />}
            title="下划线"
          />
          <MarkButton
            format="strikethrough"
            icon={<StrikethroughOutlined />}
            title="删除线"
          />

          <Popover
            content={
              <div className="flex flex-col gap-2 p-2">
                <div className="text-xs font-semibold text-gray-500 mb-1">
                  文字颜色
                </div>
                <ColorPicker
                  value={textColor}
                  presets={[
                    {
                      label: "预设",
                      colors: PRESET_COLORS,
                    },
                  ]}
                  showText
                  onChange={handleTextColorChange}
                />
                <Button size="small" onClick={clearTextColor}>
                  清除颜色
                </Button>
              </div>
            }
            title="文字颜色"
            trigger="click"
            open={textColorOpen}
            onOpenChange={(open) => {
              if (open) {
                setTextColor(getCurrentColor("color"));
              }
              setTextColorOpen(open);
            }}
          >
            <Tooltip title="文字颜色">
              <Button
                type="text"
                icon={
                  <span className="flex items-center justify-center">
                    <span
                      className="w-4 h-4 rounded border border-gray-300"
                      style={{ backgroundColor: textColor }}
                    />
                  </span>
                }
                onMouseDown={(e) => e.preventDefault()}
                className="transition-all duration-200 h-8 w-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-black/5"
              />
            </Tooltip>
          </Popover>

          <Popover
            content={
              <div className="flex flex-col gap-2 p-2">
                <div className="text-xs font-semibold text-gray-500 mb-1">
                  背景颜色
                </div>
                <ColorPicker
                  value={bgColor}
                  presets={[
                    {
                      label: "预设",
                      colors: PRESET_COLORS,
                    },
                  ]}
                  showText
                  onChange={handleBgColorChange}
                />
                <Button size="small" onClick={clearBgColor}>
                  清除颜色
                </Button>
              </div>
            }
            title="背景颜色"
            trigger="click"
            open={bgColorOpen}
            onOpenChange={(open) => {
              if (open) {
                setBgColor(getCurrentBgColor());
              }
              setBgColorOpen(open);
            }}
          >
            <Tooltip title="背景颜色">
              <Button
                type="text"
                icon={
                  <span className="flex items-center justify-center">
                    <BgColorsOutlined
                      style={{
                        color: bgColor,
                        backgroundColor:
                          bgColor === "#ffffff" ? "#eee" : "transparent",
                        padding: "2px",
                        borderRadius: "2px",
                        border: "1px solid #ddd",
                      }}
                    />
                  </span>
                }
                onMouseDown={(e) => e.preventDefault()}
                className="transition-all duration-200 h-8 w-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-black/5"
              />
            </Tooltip>
          </Popover>

          <div className="h-6 w-[1px] bg-outline-variant/20 mx-1" />

          <Tooltip title="无序列表">
            <Button
              type="text"
              shape="circle"
              icon={<UnorderedListOutlined />}
              onMouseDown={(e) => {
                e.preventDefault();
                toggleList(editor, "bulleted-list");
              }}
              className={cn(
                "transition-all duration-200 h-8 w-8 flex items-center justify-center rounded-lg",
                isListActive("bulleted-list")
                  ? "text-primary bg-primary/15 hover:bg-primary/25 shadow-sm"
                  : "text-on-surface-variant hover:bg-black/5",
              )}
            />
          </Tooltip>
          <Tooltip title="有序列表">
            <Button
              type="text"
              shape="circle"
              icon={<OrderedListOutlined />}
              onMouseDown={(e) => {
                e.preventDefault();
                toggleList(editor, "numbered-list");
              }}
              className={cn(
                "transition-all duration-200 h-8 w-8 flex items-center justify-center rounded-lg",
                isListActive("numbered-list")
                  ? "text-primary bg-primary/15 hover:bg-primary/25 shadow-sm"
                  : "text-on-surface-variant hover:bg-black/5",
              )}
            />
          </Tooltip>
          <BlockButton
            format="block-quote"
            icon={<Quote size={16} />}
            title="引用"
          />
          <Popover
            content={
              <div className="flex flex-col gap-2 p-1">
                <Input
                  placeholder="输入图片地址..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  onPressEnter={() => {
                    if (imageUrl) {
                      insertImage(editor, imageUrl);
                      setImageUrl("");
                      setImagePopoverVisible(false);
                    }
                  }}
                  autoFocus
                  className="w-64"
                />
                <div className="flex justify-end gap-2">
                  <Button
                    size="small"
                    onClick={() => setImagePopoverVisible(false)}
                  >
                    取消
                  </Button>
                  <Button
                    size="small"
                    type="primary"
                    disabled={!imageUrl}
                    onClick={() => {
                      insertImage(editor, imageUrl);
                      setImageUrl("");
                      setImagePopoverVisible(false);
                    }}
                  >
                    插入
                  </Button>
                </div>
              </div>
            }
            title="插入图片"
            trigger="click"
            open={imagePopoverVisible}
            onOpenChange={setImagePopoverVisible}
          >
            <Tooltip title="插入图片">
              <Button type="text" shape="circle" icon={<PictureOutlined />} />
            </Tooltip>
          </Popover>
          <Tooltip title="插入表格">
            <Button
              type="text"
              shape="circle"
              icon={<TableOutlined />}
              onMouseDown={(e) => {
                e.preventDefault();
                insertTable();
              }}
            />
          </Tooltip>

          <div className="h-6 w-[1px] bg-outline-variant/20 mx-1" />

          <Dropdown menu={{ items: headingItems }} trigger={["click"]}>
            <Button
              type="text"
              className="flex items-center gap-1 px-3 rounded-full hover:bg-black/5"
            >
              <span className="text-xs font-bold text-on-surface-variant">
                {getBlockLabel()}
              </span>
              <DownOutlined className="text-[10px]" />
            </Button>
          </Dropdown>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-surface-container-low rounded-full">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
              字节数:
            </span>
            <span className="text-xs font-medium text-primary">
              {getCharacterCount().toLocaleString()}
            </span>
          </div>
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={saveData}
            className="rounded-full bg-primary hover:bg-primary-dim border-none h-9 px-6 flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            保存
          </Button>
        </div>
      </div>
    </div>
  );
};
