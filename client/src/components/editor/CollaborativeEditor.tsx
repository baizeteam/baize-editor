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
import { Awareness } from "y-protocols/awareness";
import EditorComponent from "./Editor";
import {
  CollabSessionProvider,
  type SessionRole,
} from "./CollabSessionContext";
import { initialValue } from "./data";

const META_ROOM = "baize-editor-meta";
const CONTENT_ROOM = "baize-editor";

function getWebSocketUrl(): string {
  if (window.location.host === "localhost:3000") {
    return "ws://localhost:6652";
  }
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${protocol}//${window.location.host}/ws`;
}

type Props = {
  sessionRole: SessionRole;
};

const CollaborativeEditor = ({ sessionRole }: Props) => {
  const contentDoc = useMemo(() => new Y.Doc(), []);
  const sharedType = useMemo(
    () => contentDoc.get("slate", Y.XmlText),
    [contentDoc],
  );

  const appConfigRef = useRef<Y.Map<boolean> | null>(null);
  const localAwarenessRef = useRef<Awareness | null>(null);

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

  /** meta 房间：仅同步 appConfig（协同总开关） */
  useEffect(() => {
    const metaDoc = new Y.Doc();
    const appConfig = metaDoc.getMap<boolean>("appConfig");
    appConfigRef.current = appConfig;

    const metaP = new WebsocketProvider(
      getWebSocketUrl(),
      META_ROOM,
      metaDoc,
    );

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
  }, []);

  /**
   * 空 Y.XmlText 经 slate-yjs connect 会变成根下仅含裸文本节点，违反 Slate 块结构，导致无法输入。
   * 在「可展示编辑器」之前写入与产品一致的初始文档（访客仅连 meta、协同关闭时也会走此路径）。
   */
  useLayoutEffect(() => {
    if (!metaSynced) return;
    if (collabEnabled && !contentSynced) return;
    if (sharedType.toDelta().length > 0) return;

    contentDoc.transact(() => {
      sharedType.applyDelta(slateNodesToInsertDelta(initialValue), {
        sanitize: false,
      });
    });
  }, [metaSynced, collabEnabled, contentSynced, contentDoc, sharedType]);

  /**
   * 正文房间：仅在 collabEnabled 时连接。
   * 必须用 useLayoutEffect：若用 useEffect，协同关闭后会出现一帧仍把「已 destroy 的 WS awareness」传给
   * Editor，子组件 layout 先于父 effect 运行 → withCursors/connect 抛错白屏。
   */
  useLayoutEffect(() => {
    if (!metaSynced) return;

    if (!collabEnabled) {
      setContentSynced(true);
      if (!localAwarenessRef.current) {
        localAwarenessRef.current = new Awareness(contentDoc);
      }
      setAwareness(localAwarenessRef.current);
      return;
    }

    setContentSynced(false);
    const p = new WebsocketProvider(
      getWebSocketUrl(),
      CONTENT_ROOM,
      contentDoc,
    );

    const onContentSync = (synced: boolean) => {
      if (synced) setContentSynced(true);
    };
    p.on("sync", onContentSync);
    setAwareness(p.awareness);

    return () => {
      p.off("sync", onContentSync);
      p.destroy();
    };
  }, [metaSynced, collabEnabled, contentDoc]);

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
      collabSynced: !collabEnabled || contentSynced,
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

  const localAw = localAwarenessRef.current;
  const editorReady =
    metaSynced &&
    (collabEnabled
      ? Boolean(awareness) && contentSynced
      : Boolean(localAw) && awareness === localAw);

  if (!editorReady) {
    return <div className="p-8 text-center text-gray-600">加载中…</div>;
  }

  return (
    <CollabSessionProvider value={sessionValue}>
      <EditorComponent
        key={collabEnabled ? "collab-on" : "collab-off"}
        sharedType={sharedType}
        awareness={awareness}
        cursorDisplayName={cursorDisplayName}
      />
    </CollabSessionProvider>
  );
};

export default CollaborativeEditor;
