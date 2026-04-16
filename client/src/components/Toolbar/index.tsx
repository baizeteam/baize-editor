import React, { useState } from "react";
import { Editor, Transforms, Element as SlateElement } from "slate";
import { useSlate } from "slate-react";
import { Button, Tooltip, Dropdown, MenuProps, Popover, Input } from "antd";
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  UnorderedListOutlined,
  SendOutlined,
  DownOutlined,
  StrikethroughOutlined,
  TableOutlined,
  OrderedListOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { Quote } from "lucide-react";
import { toggleList } from "../../editor/plugins/list";
import { insertImage } from "../../editor/plugins/image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { styles } from "./styles";
import { ColorPickerButton } from "./ColorPickerButton";
import "./index.less";
import { defaultTable } from "./helper";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
    Transforms.insertNodes(editor, defaultTable);
  };

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
            styles.iconButton.base,
            active ? styles.iconButton.active : styles.iconButton.inactive,
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
            styles.iconButton.base,
            active ? styles.iconButton.active : styles.iconButton.inactive,
          )}
        />
      </Tooltip>
    );
  };

  const ListButton = ({
    format,
    icon,
    title,
  }: {
    format: "bulleted-list" | "numbered-list";
    icon: React.ReactNode;
    title: string;
  }) => {
    const active = isListActive(format);
    return (
      <Tooltip title={title}>
        <Button
          type="text"
          shape="circle"
          icon={icon}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleList(editor, format);
          }}
          className={cn(
            styles.listButton.base,
            active ? styles.listButton.active : styles.listButton.inactive,
          )}
        />
      </Tooltip>
    );
  };

  const saveData = () => {
    console.log(editor.children);
  };

  return (
    <div className={styles.toolbar.wrapper}>
      <div className={styles.toolbar.container}>
        <div className={styles.toolbar.buttonGroup}>
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

          <ColorPickerButton
            title="文字颜色"
            format="color"
            defaultColor="#000000"
          />
          <ColorPickerButton
            title="背景颜色"
            format="backgroundColor"
            defaultColor="#ffffff"
          />

          <div className={styles.divider} />

          <ListButton
            format="bulleted-list"
            icon={<UnorderedListOutlined />}
            title="无序列表"
          />
          <ListButton
            format="numbered-list"
            icon={<OrderedListOutlined />}
            title="有序列表"
          />
          <BlockButton
            format="block-quote"
            icon={<Quote size={16} />}
            title="引用"
          />

          <Popover
            content={
              <div className={styles.popoverContent.imageInput}>
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
                  className={styles.popoverContent.imageInputWidth}
                />
                <div className={styles.popoverContent.imageActions}>
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
              <Button
                type="text"
                shape="circle"
                icon={<PictureOutlined />}
                className="flex-shrink-0"
              />
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
              className="flex-shrink-0"
            />
          </Tooltip>

          <div className={styles.divider} />

          <Dropdown menu={{ items: headingItems }} trigger={["click"]}>
            <Button type="text" className={styles.headingDropdown}>
              <span className={styles.headingLabel}>{getBlockLabel()}</span>
              <DownOutlined className="text-[10px]" />
            </Button>
          </Dropdown>
        </div>

        <div className={styles.toolbar.rightGroup}>
          <div className={styles.charCount.container}>
            <span className={styles.charCount.label}>字节数:</span>
            <span className={styles.charCount.value}>
              {getCharacterCount().toLocaleString()}
            </span>
          </div>
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={saveData}
            className={styles.saveButton}
          >
            <span className="hidden sm:inline">保存</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
