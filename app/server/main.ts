import express from "express";
import http from "http";
import WebSocket from "ws";
import { setupWSConnection } from "y-websocket/bin/utils";

const app = express();

const ALLOWED_ORIGINS = [
  "http://localhost",
  "http://localhost:3000",
  "http://localhost:6651",
  "https://baize-editor.plume.vip",
];

app.get("/", (_req, res) => {
  res.send("Yjs WebSocket server is running 🚀");
});

const server = http.createServer(app);

const wss = new WebSocket.Server({
  server,
  verifyClient: (info, cb) => {
    const origin = info.origin as string | undefined;
    if (origin && ALLOWED_ORIGINS.includes(origin)) {
      cb(true);
    } else {
      console.log(`Rejected connection from origin: ${origin}`);
      cb(false, 403, "Forbidden: Origin not allowed");
    }
  },
});

wss.on("connection", (conn, req) => {
  setupWSConnection(conn, req);
});

const PORT = 6652;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
