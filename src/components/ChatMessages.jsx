import { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import "./ChatMessages.css";

function useAutoScroll(chatMessage) {
  const containerRef = useRef(null);

  useEffect(() => {
    const containerElem = containerRef.current;
    if (containerElem) containerElem.scrollTop = containerElem.scrollHeight;
  }, [chatMessage]);

  return containerRef;
}

function ChatMessages({ chatMessage }) {
  const chatMessagesRef = useAutoScroll(chatMessage);

  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessage.map((chatMessages) => {
        return (
          <ChatMessage
            message={chatMessages.message}
            sender={chatMessages.sender}
            key={chatMessages.id}
            time={chatMessages.time}
          />
        );
      })}
    </div>
  );
}

export default ChatMessages;
