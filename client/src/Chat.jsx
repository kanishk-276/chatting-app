import React, { useEffect, useState } from "react";
import "./components/ChatWindow.css";
import MessageBubble from "./components/MessageBubble";
import { socket, userId } from "./socket";
import axios from "axios";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // ✅ 1. Fetch messages from MongoDB when component mounts
  useEffect(() => {
    axios.get("http://localhost:5000/api/messages")
      .then(res => setMessages(res.data))
      .catch(err => console.error("Error fetching messages", err));
  }, []);

  // ✅ 2. Listen for incoming socket messages
  useEffect(() => {
    const handleMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("chat message", handleMessage);

    return () => {
      socket.off("chat message", handleMessage);
    };
  }, []);

  // ✅ 3. Send message to socket
  const sendMessage = () => {
  if (input.trim()) {
    socket.emit("chat message", {
      text: input,
      senderId: userId,
    });
    setInput(""); // Clear input
  }
};


  return (
    <div>
      <ul>
        {messages.map((m, i) => (
          <MessageBubble key={i} message={m} />
        ))}
      </ul>

      <div className="parentBox">
        <div className="messageBox">
        <textarea
  value={input}
  onChange={(e) => setInput(e.target.value)}
  placeholder="Type a Message"
  id="messageInput"
  onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent newline
      sendMessage();      // Send message
    }
  }}
/>


          <button onClick={sendMessage} id="sendButton">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
              <path
                fill="none"
                d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
              ></path>
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="33.67"
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
