import React from 'react';
import "./ChatWindow.css";

const MessageWindow = ({ children }) => {
  return <div className="message-window">{children}</div>;
};

export default MessageWindow;
