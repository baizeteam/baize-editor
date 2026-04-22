import { createContext, useContext, type ReactNode } from "react";

export type SessionRole = "guest" | "admin";

export type CollabSessionValue = {
  sessionRole: SessionRole;
  /** 来自 meta 房间的共享开关；关闭时不建立正文 WebSocket */
  collabEnabled: boolean;
  /** 仅当 collabEnabled 为 true 时：正文是否与房间完成首次同步 */
  collabSynced: boolean;
  setCollabEnabled: (next: boolean) => void;
  /** 访客在协同关闭时为只读；管理员始终可编辑 */
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
