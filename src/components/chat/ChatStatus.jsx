import React from "react";
import { ThreeDot } from "react-loading-indicators";

const ChatStatus = ({ isCreator }) => {
  return (
    <div className="flex flex-1 items-center justify-center">
      {isCreator ? (
        <ThreeDot color="#3fa4b4" size="medium" text="" textColor="" />
      ) : (
        <div className="text-gray-500">Connecting to the room...</div>
      )}
    </div>
  );
};

export default ChatStatus;
