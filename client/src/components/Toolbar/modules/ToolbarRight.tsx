import React from "react";
import { useSlate } from "slate-react";
import { Button, Switch, Tag, Tooltip } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { styles } from "../styles";
import { getCharacterCount } from "./toolbar-editor";
import { useCollabSession } from "../../editor/CollabSessionContext";

export function ToolbarRight() {
  const editor = useSlate();
  const {
    sessionRole,
    collabEnabled,
    collabSynced,
    setCollabEnabled,
    canEdit,
  } = useCollabSession();

  const saveData = () => {
    console.log(editor.children);
  };

  return (
    <div className={styles.toolbar.rightGroup}>
      <Tag color={collabEnabled ? "blue" : "default"} className="!mr-2">
        访客编辑：{collabEnabled ? "允许" : "禁止"}
        {!collabSynced ? "（正文同步中）" : ""}
      </Tag>
      {sessionRole === "admin" ? (
        <Tooltip title="对所有在线用户生效；关闭后访客不可编辑，正文仍实时同步">
          <span className="inline-flex items-center gap-2 mr-3">
            <span className="text-sm text-gray-600 hidden md:inline">
              协同编辑
            </span>
            <Switch
              checked={collabEnabled}
              onChange={setCollabEnabled}
              checkedChildren="开"
              unCheckedChildren="关"
            />
          </span>
        </Tooltip>
      ) : null}
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
        disabled={!canEdit}
        className={styles.saveButton}
      >
        <span className="hidden sm:inline">保存</span>
      </Button>
    </div>
  );
}
