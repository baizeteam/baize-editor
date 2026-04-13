const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const { setupWSConnection } = require("y-websocket/bin/utils");

const app = express();

// 基础 HTTP 路由
app.get("/", (req, res) => {
  res.send("Yjs WebSocket server is running 🚀");
});

// 创建 HTTP 服务
const server = http.createServer(app);

// 创建 WebSocket 服务
const wss = new WebSocket.Server({ server });

// 处理 WebSocket 连接（核心）
wss.on("connection", (conn, req) => {
  setupWSConnection(conn, req);
});

// 启动服务
const PORT = 1234;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
