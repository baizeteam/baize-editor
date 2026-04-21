import React, { useState } from "react";
import { useSlate } from "slate-react";
import { Button, Tooltip, Popover, Input } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import { insertImage } from "../../../core/plugins/image";
import { styles } from "../styles";

export function ImageInsertButton() {
  const editor = useSlate();
  const [imageUrl, setImageUrl] = useState("");
  const [open, setOpen] = useState(false);

  const commit = () => {
    if (!imageUrl) return;
    insertImage(editor, imageUrl);
    setImageUrl("");
    setOpen(false);
  };

  return (
    <Popover
      content={
        <div className={styles.popoverContent.imageInput}>
          <Input
            placeholder="输入图片地址..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onPressEnter={commit}
            autoFocus
            className={styles.popoverContent.imageInputWidth}
          />
          <div className={styles.popoverContent.imageActions}>
            <Button size="small" onClick={() => setOpen(false)}>
              取消
            </Button>
            <Button
              size="small"
              type="primary"
              disabled={!imageUrl}
              onClick={commit}
            >
              插入
            </Button>
          </div>
        </div>
      }
      title="插入图片"
      trigger="click"
      open={open}
      onOpenChange={setOpen}
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
  );
}
