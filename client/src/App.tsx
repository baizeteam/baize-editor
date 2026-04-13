/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import EditorComponent from "./editor/CollaborativeEditor";
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
      <EditorComponent />
    </ConfigProvider>
  );
}
