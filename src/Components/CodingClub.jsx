import React, { useState, useEffect, useRef } from "react";
import { ref, onValue, push } from "firebase/database";
import { realtimeDB } from "../firebase";
import { useUserContext } from "../userContext";
import CodeSnippetModal from "./CodeSnippetModal";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { IoSendSharp } from "react-icons/io5";
import Avatar from "@mui/material/Avatar";

const CodingClub = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isCodeSnippetModalOpen, setIsCodeSnippetModalOpen] = useState(false);
  const [codeSnippetText, setCodeSnippetText] = useState("");
  const [username, setUsername] = useState("");
  const [userProfilePic, setUserProfilePic] = useState();

  const { userId } = useUserContext();
  const messagesRef = ref(realtimeDB, "messages");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData(userId);
        setUsername(userData.username);
        // setUserProfilePic(userData.profilePic);

        onValue(messagesRef, (snapshot) => {
          const messageData = snapshot.val();
          const messageList = messageData
            ? Object.values(messageData).reverse()
            : [];
          setMessages(messageList);

          scrollToBottom();
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userId]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const chatMessages =
        chatContainerRef.current.querySelector(".chat-messages");
      if (chatMessages) {
        const lastMessage = chatMessages.firstChild;
        if (lastMessage) {
          lastMessage.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    const messageObject = {
      uid: userId,
      username: username,
      // userProfilePic: userProfilePic,
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
      username: username,
      // userProfilePic: userProfilePic,
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  async function fetchUserData(userId) {
    const db = getFirestore();
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      return userDocSnap.data();
    } else {
      return null;
    }
  }

  return (
    <div className="chat-container pt-20 pr-2 pl-2" ref={chatContainerRef}>
      <ul className="chat-messages flex flex-col-reverse gap-3 overflow-y-auto mb-12">
        {messages.map((message, index) => (
          <li
            key={message.id || index}
            className={`message-item  ${
              message.uid === userId ? "self-end" : ""
            } max-w-sm rounded-lg p-3 shadow-md 
              ${
                message.uid === userId
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
          >
            <div className="flex items-center justify-start mb-1">
              {message.uid !== userId && (
                <Avatar color="sucess" size="md" variant="solid" />
              )}
              <h2 className="font-semibold text-sm ml-3">{message.username}</h2>
            </div>
            {message.isCodeSnippet ? (
              <pre className="bg-gray-800 text-white rounded p-2 w-fit">
                <code>{message.text}</code>
              </pre>
            ) : (
              <p>{message.text}</p>
            )}
            <div className=" mt-2 text-xs text-gray-900">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </li>
        ))}
      </ul>

      <div className="flex w-[78%] max-sm:w-full fixed bottom-0">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          type="text"
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 focus:outline-none focus:ring-indigo-500"
        />
        <div className="rounded-lg">
          <button
            className="bg-black text-white p-2 rounded-l-lg hover:bg-indigo-500 transition-colors duration-200 max-sm:h-full"
            onClick={() => setIsCodeSnippetModalOpen(true)}
          >
            Add Code Snippet
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-800 text-white rounded-r-lg max-sm:h-full p-2 hover:bg-indigo-500 transition-colors duration-200"
          >
            <IoSendSharp />
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
