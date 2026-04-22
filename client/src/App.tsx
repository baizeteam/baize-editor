import { useState } from "react";
import { CollaborativeEditor } from "./components";
import { ConfigProvider } from "antd";
import { EntryGateModal } from "./components/EntryGateModal";
import type { SessionRole } from "./components/editor/CollabSessionContext";

export default function App() {
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
      <EntryGateModal
        open={sessionRole === null}
        onGuest={() => setSessionRole("guest")}
        onAdminSuccess={() => setSessionRole("admin")}
      />
      {sessionRole !== null ? (
        <CollaborativeEditor sessionRole={sessionRole} />
      ) : null}
    </ConfigProvider>
  );
}
