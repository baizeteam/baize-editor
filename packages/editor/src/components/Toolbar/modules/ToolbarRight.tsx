import { useSlate } from "slate-react";
import {
  Button,
  Switch,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@pkg/awsome";
import { Send } from "lucide-react";
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
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
          collabEnabled
            ? "bg-primary/10 text-primary"
            : "bg-muted text-muted-foreground"
        } !mr-2`}
      >
        访客编辑：{collabEnabled ? "允许" : "禁止"}
        {!collabSynced ? "（正文同步中）" : ""}
      </span>
      {sessionRole === "admin" ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="inline-flex items-center gap-2 mr-3">
              <span className="text-sm text-gray-600 hidden md:inline">
                协同编辑
              </span>
              <Switch
                checked={collabEnabled}
                onCheckedChange={setCollabEnabled}
              />
            </span>
          </TooltipTrigger>
          <TooltipContent>
            对所有在线用户生效；关闭后访客不可编辑，正文仍实时同步
          </TooltipContent>
        </Tooltip>
      ) : null}
      <div className={styles.charCount.container}>
        <span className={styles.charCount.label}>字节数:</span>
        <span className={styles.charCount.value}>
          {getCharacterCount(editor).toLocaleString()}
        </span>
      </div>
      <Button
        onClick={saveData}
        disabled={!canEdit}
        className={styles.saveButton}
      >
        <Send size={16} />
        <span className="hidden sm:inline">保存</span>
      </Button>
    </div>
  );
}
