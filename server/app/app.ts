import express from "express";
import router from "./routes/route";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import http from "http";
import { Server as ServerIo } from "socket.io";
import { Client as PGClient } from "pg"; // PostgreSQL 클라이언트

dotenv.config();

const app = express();
const server = http.createServer(app);
const SERVICE_PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

const io = new ServerIo(server, {
  cors: {
    origin: process.env.ORIGIN, // 또는 "http://localhost:3000" (프론트엔드 주소)
    methods: ["GET", "POST"],
  },
  allowEIO3: true, // socket.io 클라이언트 버전 호환성 옵션 (필요 시)
});
io.on("connection", (socket) => {
  console.log(`✅ 클라이언트 연결됨: ${socket.id}`);

  // 클라이언트로부터 메시지 수신
  socket.on("message", (data) => {
    console.log(`📩 받은 메시지: ${data}`);
    // 모든 클라이언트에게 메시지 브로드캐스트
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log(`❌ 클라이언트 연결 해제: ${socket.id}`);
  });
});

const pgClient = new PGClient({
  connectionString: process.env.DATABASE_URL, // PostgreSQL 연결 문자열
});

pgClient
  .connect()
  .then(() => {
    console.log("✅ PostgreSQL에 연결됨");
    return pgClient.query("LISTEN post_changes"); // 'post_changes' 채널 구독
  })
  .catch((err) => console.error("❌ PostgreSQL 연결 실패:", err));

pgClient.on("notification", (msg) => {
  console.log("🔔 DB 변경 감지:", msg);
  // 'dbChange' 이벤트로 클라이언트에 변경 사항 전달
  io.emit("dbChange", msg.payload);
});

app.use("/api", router);

server.listen(SERVICE_PORT, () => {
  console.log(`SERVER PORT: ${SERVICE_PORT}`);
});
