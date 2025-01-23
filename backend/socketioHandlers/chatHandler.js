import sgMail from "@sendgrid/mail";
import { generateRoomId } from "../utils/randNumb.js";
import dotenv from "dotenv";
dotenv.config();
sgMail.setApiKey(process.env.API_SENDGRID);
const rooms = {};

/**
 * Attach all event listeners to the provided socket.io instance.
 * 
 * @param {Server} io - The main socket.io server instance.
 */
export function SocketListeners(io) {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("createRoom", async () => {
      const roomId = generateRoomId();
      rooms[roomId] = [socket.id];
      socket.join(roomId);

      const link = `http://192.168.1.87:5173/?roomId=${roomId}`;
      const msg = {
        to: "barspin4499@gmail.com",
        from: "foxerbn@outlook.com",
        subject: "New Support Room",
        text: `Join the new support room: ${link}`,
        html: `<p>Join the new support room: <a href="${link}">${link}</a></p>`,
      };

      try {
        await sgMail.send(msg);
        console.log("Email sent for room:", roomId);
      } catch (error) {
        console.error("SendGrid error:", error);
      }

      socket.emit("roomCreated", roomId);
    });

    socket.on("joinRoom", (roomId) => {
      if (!rooms[roomId]) {
        rooms[roomId] = [];
      }

      const currentRoom = rooms[roomId];

      if (currentRoom.length >= 2) {
        socket.emit("error", "Room is full. Max 2 users allowed.");
        return;
      }

      currentRoom.push(socket.id);
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);

      if (currentRoom.length === 2) {
        io.to(roomId).emit("roomReady");
      }
    });

    socket.on("message", (data) => {
      const { roomId, message, isCreator } = data;
      io.to(roomId).emit("recieveMessage", { message, isCreator });
      console.log(
        `Message in room ${roomId} from ${
          isCreator ? "User" : "Support"
        }: ${message}`
      );
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      for (const roomId in rooms) {
        const index = rooms[roomId].indexOf(socket.id);
        if (index !== -1) {
          rooms[roomId].splice(index, 1);

          if (rooms[roomId].length === 1) {
            io.to(roomId).emit("roomNotReady");
          }
          if (rooms[roomId].length === 0) {
            delete rooms[roomId];
          }
        }
      }
    });
  });
}

