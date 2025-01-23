import React from "react";
import { FaPlus } from "react-icons/fa";

const ChatHeader = ({ onCreateRoom, roomId }) => {
  return (
    <div className="px-4 py-3 border-b dark:border-zinc-700 flex justify-between items-center">
      <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
        Assistant
      </h2>

      {roomId ? (
        <div className="text-green-500 font-bold text-sm">Room: {roomId}</div>
      ) : (
        <button onClick={onCreateRoom}>
          <FaPlus className="text-blue-500 text-xl" />
        </button>
      )}
    </div>
  );
};

export default ChatHeader;
