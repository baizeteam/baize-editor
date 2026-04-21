import React from "react";
import { useSlate } from "slate-react";
import { Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { styles } from "../styles";
import { getCharacterCount } from "./toolbar-editor";

export function ToolbarRight() {
  const editor = useSlate();

  const saveData = () => {
    console.log(editor.children);
  };

  return (
    <div className={styles.toolbar.rightGroup}>
      <div className={styles.charCount.container}>
        <span className={styles.charCount.label}>字节数:</span>
        <span className={styles.charCount.value}>
          {getCharacterCount(editor).toLocaleString()}
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
  );
}
