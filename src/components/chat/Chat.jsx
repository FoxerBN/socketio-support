import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import ChatHeader from "./ChatHeader";
import ChatStatus from "./ChatStatus";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

const socket = io("http://localhost:3000");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [isRoomReady, setIsRoomReady] = useState(false);
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const existingRoom = params.get("roomId");

    if (existingRoom) {
      setRoomId(existingRoom);
      socket.emit("joinRoom", existingRoom);
    }

    socket.on("recieveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("roomReady", () => {
      setIsRoomReady(true);
    });
    socket.on("roomNotReady", () => {
      setIsRoomReady(false);
    });

    socket.on("roomCreated", (newRoomId) => {
      setRoomId(newRoomId);
      setIsRoomReady(false);
    });

    return () => {
      socket.off("recieveMessage");
      socket.off("roomReady");
      socket.off("roomNotReady");
      socket.off("roomCreated");
    };
  }, []);

  const createRoom = () => {
    setIsCreator(true);
    socket.emit("createRoom");
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("message", { roomId, message, isCreator });
    setMessage("");
  };

  let content;
  if (!isRoomReady) {
    content = (
      <ChatStatus 
        isCreator={isCreator}
      />
    );
  } else {
    content = (
      <>
        <ChatMessages 
          messages={messages} 
          isCreator={isCreator} 
        />
        <ChatInput
          message={message}
          setMessage={setMessage}
          isRoomReady={isRoomReady}
          sendMessage={sendMessage}
        />
      </>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white w-[300px] dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden">
      <div className="flex flex-col h-[400px]">
        <ChatHeader onCreateRoom={createRoom} roomId={roomId} />
        {content}
      </div>
    </div>
  );
};

export default Chat;
