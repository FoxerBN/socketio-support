import React from "react";

const ChatMessages = ({ messages, isCreator }) => {
  return (
    <div className="flex-1 p-3 overflow-y-auto flex flex-col space-y-2">
      {messages.map((msg, index) => {
        const isMine = msg.isCreator === isCreator;
        return (
          <div
            key={index}
            className={`
              max-w-[200px] rounded-lg px-3 py-1.5 text-sm break-words whitespace-normal
              ${isMine ? "self-end bg-blue-500 text-white" : "self-start bg-green-500 text-white"}
            `}
          >
            {msg.message}
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessages;
