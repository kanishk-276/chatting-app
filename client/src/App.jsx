import React from "react";
import "./components/ChatWindow.css";
import MessageWindow from "./components/MessageWindow";
import Chat from "./Chat";
import "./components/ChatWindow.css";

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
