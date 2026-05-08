import { createContext, useContext, type ReactNode } from "react";

export type SessionRole = "guest" | "admin";

export type CollabSessionValue = {
  sessionRole: SessionRole;
  /**
   * 来自 meta 房间：访客可编辑开关（true=访客可改文档）。
   * 正文 Yjs 始终经 WebSocket 同步；关闭时仅禁止访客编辑，文档仍实时同步。
   */
  collabEnabled: boolean;
  /** 正文房间是否已完成首次 Yjs 同步 */
  collabSynced: boolean;
  setCollabEnabled: (next: boolean) => void;
  /** 访客在 collabEnabled 为 false 时为只读；管理员始终可编辑 */
  canEdit: boolean;
};

const CollabSessionContext = createContext<CollabSessionValue | null>(null);

export function CollabSessionProvider({
  value,
  children,
}: {
  value: CollabSessionValue;
  children: ReactNode;
}) {
  return (
    <CollabSessionContext.Provider value={value}>
      {children}
    </CollabSessionContext.Provider>
  );
}

export function useCollabSession(): CollabSessionValue {
  const v = useContext(CollabSessionContext);
  if (!v) {
    throw new Error("useCollabSession must be used within CollabSessionProvider");
  }
  return v;
}
