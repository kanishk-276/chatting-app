import React from "react";
import { userId } from "../socket";
import "./ChatWindow.css";

function MessageBubble({ message }) {
  const isOwnMessage = message.senderId === userId;

  return (
    <li className={isOwnMessage ? "right-bubble" : "left-bubble"}>
      {message.text}
    </li>
  );
}

export default MessageBubble;
