import React from "react";

const ChatInput = ({ message, setMessage, isRoomReady, sendMessage }) => {
  return (
    <div className="px-3 py-2 border-t dark:border-zinc-700">
      <div className="flex gap-2">
        <input
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg dark:bg-zinc-700 dark:text-white dark:border-zinc-600 text-sm"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!isRoomReady}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 
                     rounded-lg transition duration-300 ease-in-out text-sm 
                     disabled:opacity-50"
          onClick={sendMessage}
          disabled={!isRoomReady}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
