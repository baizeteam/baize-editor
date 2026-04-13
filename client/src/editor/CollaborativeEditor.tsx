import React, { useEffect, useState } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import EditorComponent from "./Editor";

const CollaborativeEditor = () => {
  const [sharedType, setSharedType] = useState<any>();
  const [provider, setProvider] = useState<any>();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    console.log("🟡 init Yjs");

    const yDoc = new Y.Doc();
    const shared = yDoc.get("slate", Y.XmlText);

    const p = new WebsocketProvider("ws://localhost:1234", "slate-room", yDoc);

    p.on("status", (e: any) => {
      console.log("🟢 ws:", e.status);
    });

    p.on("sync", setConnected);

    setSharedType(shared);
    setProvider(p);

    return () => {
      yDoc.destroy();
      p?.off("sync", setConnected);
      p.destroy();
    };
  }, []);

  // ❗ 必须等同步完成
  if (!connected || !sharedType || !provider) {
    return <div>Loading ...</div>;
  }

  return <EditorComponent sharedType={sharedType} provider={provider} />;
};

export default CollaborativeEditor;
