import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { SocketListeners } from "./socketioHandlers/chatHandler.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://192.168.1.87:5173",
    methods: ["GET", "POST"],
  },
});

SocketListeners(io);

httpServer.listen(3000, "0.0.0.0", () => {
  console.log("Server started on http://0.0.0.0:3000");
});
