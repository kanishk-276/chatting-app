import React from "react";
import Chat from "./Chat";
import MessageWindow from "./components/MessageWindow";
import "./components/ChatWindow.css";
import MessageBubble from "./components/MessageBubble";

function App() {
  return (
    <div className="App">
      <MessageWindow>
         <Chat />
      </MessageWindow>
    
    </div>
  );
}

export default App;
