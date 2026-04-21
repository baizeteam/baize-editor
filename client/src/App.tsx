import { CollaborativeEditor } from "./components";
import { ConfigProvider } from "antd";

export default function App() {
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
      <CollaborativeEditor />
    </ConfigProvider>
  );
}
