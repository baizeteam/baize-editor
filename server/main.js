const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const { setupWSConnection } = require("y-websocket/bin/utils");

const app = express();

// 允许的域名白名单
const ALLOWED_ORIGINS = [
  "http://localhost:3000", // 本地开发
  "https://your-domain.com", // 你的特殊域名
  "https://sub.your-domain.com", // 子域名
];

// 基础 HTTP 路由
app.get("/", (req, res) => {
  res.send("Yjs WebSocket server is running 🚀");
});

// 创建 HTTP 服务
const server = http.createServer(app);

// 创建 WebSocket 服务
const wss = new WebSocket.Server({
  server,
  verifyClient: (info, cb) => {
    const origin = info.origin;

    // 检查 origin 是否在白名单中
    if (ALLOWED_ORIGINS.includes(origin)) {
      cb(true); // 允许连接
    } else {
      console.log(`Rejected connection from origin: ${origin}`);
      cb(false, 403, "Forbidden: Origin not allowed");
    }
  },
});

// 处理 WebSocket 连接（核心）
wss.on("connection", (conn, req) => {
  setupWSConnection(conn, req);
});

// 启动服务
const PORT = 1234;
server.listen(PORT, "127.0.0.1", () => {
  // 只监听 localhost
  console.log(`Server running on http://localhost:${PORT}`);
});
