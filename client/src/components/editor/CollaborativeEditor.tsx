import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as Y from "yjs";
import { slateNodesToInsertDelta } from "@slate-yjs/core";
import { WebsocketProvider } from "y-websocket";
import type { Awareness } from "y-protocols/awareness";
import EditorComponent from "./Editor";
import {
  CollabSessionProvider,
  type SessionRole,
} from "./CollabSessionContext";
import { initialValue } from "./data";

const META_ROOM_PREFIX = "baize-editor-meta";
const CONTENT_ROOM_PREFIX = "baize-editor";

function getWebSocketUrl(): string {
  if (window.location.host === "localhost:3000") {
    return "ws://localhost:6652";
  }
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${protocol}//${window.location.host}/ws`;
}

type Props = {
  sessionRole: SessionRole;
  roomId: number;
};

const CollaborativeEditor = ({ sessionRole, roomId }: Props) => {
  const contentDoc = useMemo(() => new Y.Doc(), []);
  const sharedType = useMemo(
    () => contentDoc.get("slate", Y.XmlText),
    [contentDoc],
  );

  const appConfigRef = useRef<Y.Map<boolean> | null>(null);

  const [metaSynced, setMetaSynced] = useState(false);
  const [collabEnabled, setCollabEnabled] = useState(true);
  const [contentSynced, setContentSynced] = useState(false);
  const [awareness, setAwareness] = useState<Awareness | null>(null);

  const cursorDisplayName = useMemo(
    () =>
      sessionRole === "admin"
        ? "管理员"
        : `访客·${String(contentDoc.clientID).slice(-4)}`,
    [sessionRole, contentDoc.clientID],
  );

  /** meta 房间：同步 appConfig（访客是否可编辑等） */
  useEffect(() => {
    const metaDoc = new Y.Doc();
    const appConfig = metaDoc.getMap<boolean>("appConfig");
    appConfigRef.current = appConfig;

    const metaRoom = `${META_ROOM_PREFIX}-${roomId}`;
    const metaP = new WebsocketProvider(getWebSocketUrl(), metaRoom, metaDoc);

    const applyFromMap = () => {
      const raw = appConfig.get("collabEnabled");
      setCollabEnabled(raw !== false);
    };

    const onMetaSync = (synced: boolean) => {
      if (synced) {
        setMetaSynced(true);
        applyFromMap();
      }
    };

    metaP.on("sync", onMetaSync);
    appConfig.observe(applyFromMap);

    return () => {
      appConfig.unobserve(applyFromMap);
      metaP.off("sync", onMetaSync);
      metaP.destroy();
      metaDoc.destroy();
      appConfigRef.current = null;
    };
  }, [roomId]);

  /**
   * 正文房间：始终连接，保证所有人文档与 awareness 实时一致。
   * 「协同关闭」仅表示访客不可编辑（见 canEdit），不断开同步。
   */
  useLayoutEffect(() => {
    if (!metaSynced) return;

    const contentRoom = `${CONTENT_ROOM_PREFIX}-${roomId}`;
    const p = new WebsocketProvider(getWebSocketUrl(), contentRoom, contentDoc);

    const onContentSync = (synced: boolean) => {
      if (synced) setContentSynced(true);
    };
    p.on("sync", onContentSync);
    setAwareness(p.awareness);

    return () => {
      p.off("sync", onContentSync);
      p.destroy();
    };
  }, [metaSynced, contentDoc, roomId]);

  /**
   * 空 Y.XmlText 经 slate-yjs connect 会变成根下仅含裸文本节点，违反 Slate 块结构。
   * 在正文首次同步完成且仍为空时写入初始文档。
   */
  useLayoutEffect(() => {
    if (!contentSynced) return;
    if (sharedType.toDelta().length > 0) return;

    contentDoc.transact(() => {
      sharedType.applyDelta(slateNodesToInsertDelta(initialValue), {
        sanitize: false,
      });
    });
  }, [contentSynced, contentDoc, sharedType]);

  const setCollabEnabledAction = useCallback(
    (next: boolean) => {
      if (sessionRole !== "admin") return;
      appConfigRef.current?.set("collabEnabled", next);
    },
    [sessionRole],
  );

  const canEdit = sessionRole === "admin" || collabEnabled;

  const sessionValue = useMemo(
    () => ({
      sessionRole,
      collabEnabled,
      collabSynced: contentSynced,
      setCollabEnabled: setCollabEnabledAction,
      canEdit,
    }),
    [
      sessionRole,
      collabEnabled,
      contentSynced,
      setCollabEnabledAction,
      canEdit,
    ],
  );

  const editorReady = metaSynced && Boolean(awareness) && contentSynced;

  if (!editorReady) {
    return <div className="p-20 text-center text-gray-600">加载中…</div>;
  }

  return (
    <CollabSessionProvider value={sessionValue}>
      <EditorComponent
        sharedType={sharedType}
        awareness={awareness}
        cursorDisplayName={cursorDisplayName}
      />
    </CollabSessionProvider>
  );
};

export default CollaborativeEditor;
