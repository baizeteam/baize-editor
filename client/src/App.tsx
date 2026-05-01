import { useState } from "react";
import { CollaborativeEditor } from "./components";
import { ConfigProvider } from "antd";
import { EntryGateModal } from "./components/EntryGateModal";
import InvalidRoom from "./components/InvalidRoom";
import type { SessionRole } from "./components/editor/CollabSessionContext";

const VALID_ROOM_IDS = Array.from({ length: 10 }, (_, i) => i + 1);

function getRoomId(): number | null {
  const raw = new URLSearchParams(window.location.search).get("roomid");
  if (!raw) return null;
  const id = Number(raw);
  return VALID_ROOM_IDS.includes(id) ? id : null;
}

export default function App() {
  const roomId = getRoomId();
  const [sessionRole, setSessionRole] = useState<SessionRole | null>(null);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0053db",
          borderRadius: 8,
          fontFamily: "Inter, sans-serif",
        },
      }}
    >
      {roomId !== null ? (
        <>
          <EntryGateModal
            open={sessionRole === null}
            onGuest={() => setSessionRole("guest")}
            onAdminSuccess={() => setSessionRole("admin")}
          />
          {sessionRole !== null ? (
            <CollaborativeEditor sessionRole={sessionRole} roomId={roomId} />
          ) : null}
        </>
      ) : (
        <InvalidRoom />
      )}
    </ConfigProvider>
  );
}
