import dayjs from "dayjs";
import { useState } from "react";
import { Chatbot } from "supersimpledev";
import LoadingSpinnerGif from "../assets/loading-spinner.gif";
import "./ChatInput.css";

export function ChatInput({ chatMessage, setChatMessage }) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText === "") return;

    setIsLoading(true);

    setInputText("");
    const newChatMessage = [
      ...chatMessage,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      },
    ];

    // setChatMessage(newChatMessage);
    setChatMessage([
      ...newChatMessage,
      {
        message: <img src={LoadingSpinnerGif} className="loading-spinner" />,
        sender: "robot",
        id: crypto.randomUUID()
      },
    ]);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessage([
      ...newChatMessage,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      },
    ]);

    setIsLoading(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") sendMessage();

    if (event.key === "Escape") {
      setInputText("");
    }
  }

  function clearMessage() {
    setChatMessage([]);
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
        value={inputText}
        className="chat-input"
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
      <button onClick={clearMessage} className="clear-button">
        Clear
      </button>
    </div>
  );
}