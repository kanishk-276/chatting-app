import React, { useEffect, useState } from "react";
import { socket } from "./socket";
import "./components/ChatWindow.css";
import MessageBubble from "./components/MessageBubble";


export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("chat message", input);
      setInput("");
    }
  };

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("chat message");
  }, []);

  return (
    <div>
      <ul>
        {messages.map((m, i) => (
         <MessageBubble key={i} message={m} />
          
        ))}
      </ul>
      <div className="parentBox">
      <div className="messageBox">
      <input
        
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required="" placeholder="Message..." type="text" id="messageInput" 
      />

        <button onClick={sendMessage} id="sendButton">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
      <path
        fill="none"
        d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
      ></path>
      <path
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="33.67"
        stroke="#6c6c6c"
        d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
      ></path>
    </svg>
  </button>
        
</div>
</div>
    </div>
  );
}
