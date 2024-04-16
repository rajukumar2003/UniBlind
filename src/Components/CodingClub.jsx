import React, { useState, useEffect, useRef } from "react";
import { ref, onValue, push } from "firebase/database";
import { realtimeDB } from "../firebase";
import { useUserContext } from "../userContext";
import CodeSnippetModal from "./CodeSnippetModal";

const CodingClub = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isCodeSnippetModalOpen, setIsCodeSnippetModalOpen] = useState(false);
  const [codeSnippetText, setCodeSnippetText] = useState("");

  const { userId } = useUserContext();
  const messagesRef = ref(realtimeDB, "messages");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    onValue(messagesRef, (snapshot) => {
      const messageData = snapshot.val();
      const messageList = messageData ? Object.values(messageData).reverse() : [];
      setMessages(messageList);
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const chatMessages = chatContainerRef.current.querySelector('.chat-messages');
      if (chatMessages) {
        const lastMessage = chatMessages.firstChild;
        if (lastMessage) {
          lastMessage.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    const messageObject = {
      uid: userId,
      text: codeSnippetText,
      timestamp: Date.now(),
      isCodeSnippet: true,
    };
    push(ref(realtimeDB, "messages"), messageObject)
      .then(() => setNewMessage(""))
      .catch((error) => {
        console.error("Error pushing message:", error);
      });
    setIsCodeSnippetModalOpen(false);
    setCodeSnippetText("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const messageObject = {
      uid: userId,
      text: newMessage,
      timestamp: Date.now(),
    };
    push(ref(realtimeDB, "messages"), messageObject)
      .then(() => setNewMessage(""))
      .catch((error) => {
        console.error("Error pushing message:", error);
      });
  };

<<<<<<< HEAD
  return (
    <div className="chat-container pt-20 pr-2 pl-2 ">
      <ul className="chat-messages flex flex-col-reverse gap-3 mb-12 ">
        {messages.map((message, index) => (
          <li
            key={message.id || index}
            className={`message-item ${message.uid === userId ? "self-end" : ""} max-w-sm  
                            ${message.uid === userId ? "bg-indigo-500 text-white rounded-l-lg" : "bg-gray-200 rounded-r-lg"} break-word p-3 shadow-md`}
=======
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-container pt-20 pr-2 pl-2" ref={chatContainerRef}>
      <ul className="chat-messages flex flex-col-reverse gap-3 overflow-y-auto mb-12">
        {messages.map((message, index) => (
          <li
            key={message.id || index}
            className={`message-item ${message.uid === userId ? "self-end" : ""} max-w-sm rounded-lg p-3 shadow-md 
              ${message.uid === userId ? "bg-indigo-500 text-white" : "bg-gray-100 text-gray-800"}`}
>>>>>>> 7e02700d7de9a5017d305af1965c890687681457
          >
            {message.isCodeSnippet ? (
              <pre className="bg-gray-800 text-white rounded p-2">
                <code>{message.text}</code>
              </pre>
            ) : (
              <p>{message.text}</p>
            )}
<<<<<<< HEAD
            <span
              className={`time-stamp text-xs
                            ${message.uid === userId ? "text-gray-300" : "text-gray-600"}`}
            >
              {message.time}
            </span>
=======
            <div className="meta-info flex items-center text-xs text-gray-800">
              <span>{new Date(message.timestamp).toLocaleDateString()}</span>
              <span className="mx-1">•</span>
              <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
            </div>
>>>>>>> 7e02700d7de9a5017d305af1965c890687681457
          </li>
        ))}
      </ul>

      <div className="flex w-[78%] fixed bottom-0">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          type="text"
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 focus:outline-none focus:ring-indigo-500"
        />
        <div className="rounded-lg border-2 border-white">
          <button
            className="bg-black text-white p-2 rounded-l-lg hover:bg-indigo-500 transition-colors duration-200"
            onClick={() => setIsCodeSnippetModalOpen(true)}
          >
            Add Code Snippet
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-800 text-white rounded-r-lg p-2 border-l-2 border-white hover:bg-indigo-500 transition-colors duration-200"
          >
            Send
          </button>
        </div>
      </div>
      {isCodeSnippetModalOpen && (
        <CodeSnippetModal
          onClose={() => setIsCodeSnippetModalOpen(false)}
          codeSnippetText={codeSnippetText}
          onCodeChange={setCodeSnippetText}
          onCodeSubmit={handleCodeSubmit}
        />
      )}
    </div>
  );
};

export default CodingClub;
