import { useState, useEffect } from "react";
import { Chatbot } from "supersimpledev";
import { ChatInput } from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import "./App.css";

function App() {
  const [chatMessage, setChatMessage] = useState(
    JSON.parse(localStorage.getItem("messages")) || [],
  );
  // const [ chatMessage, setChatMessage ] = array;
  // const chatMessage = array[0];
  // const setChatMessage = array[1];

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessage));
  }, [chatMessage]);

  useEffect(() => {
    Chatbot.addResponses({
      goodbye: "Goodbye. Have a great day!",
      "give me a unique id": function () {
        return `Sure! Here's a unique Id ${crypto.randomUUID()}`;
      },
    });
  }, []);

  return (
    <div className="app-container">
      {chatMessage.length === 0 && (
        <p className="welcome-message">
          Welcome to the chatbot project! Send a message using the textbox below
        </p>
      )}
      <ChatMessages chatMessage={chatMessage} />
      <ChatInput chatMessage={chatMessage} setChatMessage={setChatMessage} />
    </div>
  );
}

export default App;
