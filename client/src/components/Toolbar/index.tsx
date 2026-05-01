import React from "react";
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  StrikethroughOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { Quote } from "lucide-react";
import { ColorPickerButton } from "./modules/ColorPickerButton";
import "./index.less";
import { styles } from "./styles";
import { MarkButton } from "./modules/MarkButton";
import { BlockButton } from "./modules/BlockButton";
import { ListButton } from "./modules/ListButton";
import { ImageInsertButton } from "./modules/ImageInsertButton";
import { InsertTableButton } from "./modules/InsertTableButton";
import { HeadingDropdown } from "./modules/HeadingDropdown";
import { ToolbarRight } from "./modules/ToolbarRight";
import { useCollabSession } from "../editor/CollabSessionContext";

export const Toolbar: React.FC = () => {
  const { canEdit } = useCollabSession();

  return (
    <div className={styles.toolbar.wrapper}>
      <div className={styles.toolbar.container}>
        <div
          className={`${styles.toolbar.buttonGroup}${!canEdit ? " pointer-events-none opacity-55" : ""}`}
          title={
            !canEdit ? "当前禁止访客编辑，仅管理员可改（文档仍与大家同步）" : undefined
          }
        >
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
          <MarkButton format="badge" icon={<TagOutlined />} title="徽章" />

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

          <ImageInsertButton />
          <InsertTableButton />

          <div className={styles.divider} />

          <HeadingDropdown />
        </div>

        <ToolbarRight />
      </div>
    </div>
  );
};
