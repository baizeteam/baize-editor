import React from "react"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react"
import { Quote } from "lucide-react"
import { ColorPickerButton } from "./modules/ColorPickerButton"
import "./index.css"
import { styles } from "./styles"
import { MarkButton } from "./modules/MarkButton"
import { BlockButton } from "./modules/BlockButton"
import { ListButton } from "./modules/ListButton"
import { ImageInsertButton } from "./modules/ImageInsertButton"
import { InsertTableButton } from "./modules/InsertTableButton"
import { BadgeButton } from "./modules/BadgeButton"
import { HeadingDropdown } from "./modules/HeadingDropdown"
import { ToolbarRight } from "./modules/ToolbarRight"
import { useCollabSession } from "../editor/CollabSessionContext"

export const Toolbar: React.FC = () => {
  const { canEdit } = useCollabSession()

  return (
    <div className={styles.toolbar.wrapper}>
      <div className={styles.toolbar.container}>
        <div
          className={`${styles.toolbar.buttonGroup}${!canEdit ? "pointer-events-none opacity-55" : ""}`}
          title={
            !canEdit
              ? "当前禁止访客编辑，仅管理员可改（文档仍与大家同步）"
              : undefined
          }
        >
          <MarkButton format="bold" icon={<Bold size={16} />} title="粗体" />
          <MarkButton
            format="italic"
            icon={<Italic size={16} />}
            title="斜体"
          />
          <MarkButton
            format="underline"
            icon={<Underline size={16} />}
            title="下划线"
          />
          <MarkButton
            format="strikethrough"
            icon={<Strikethrough size={16} />}
            title="删除线"
          />
          <BadgeButton />

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
            icon={<List size={16} />}
            title="无序列表"
          />
          <ListButton
            format="numbered-list"
            icon={<ListOrdered size={16} />}
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
  )
}
