import React from 'react';
import { useState, useEffect } from 'react';
import { ref, onValue, push } from 'firebase/database';
import { realtimeDB } from '../firebase';
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';
import { useUserContext } from "../userContext";
import CodeSnippetModal from './CodeSnippetModal';

const CodingClub = () => {
    const [messages, setMessages] = useState([]); 
    const [newMessage, setNewMessage] = useState('');
    const [isCodeSnippetModalOpen, setIsCodeSnippetModalOpen] = useState(false);
    const [codeSnippetText, setCodeSnippetText] = useState('');

    const { userId } = useUserContext();

    const messagesRef = ref(realtimeDB, 'messages');
    useEffect(() => {
        onValue(messagesRef, (snapshot) => {
            const messageData = snapshot.val();
            const messageList = messageData ? Object.values(messageData).reverse() : [];
            setMessages(messageList);
        });
    }, []);

    const handleCodeSubmit = (e) => {
        e.preventDefault();
        console.log(parserBabel)
        const formattedCode = prettier.format(codeSnippetText, {
            parser: 'babel',
            plugins: [parserBabel],
            // ... (Add more Prettier options from your .prettierrc if needed)
        });

        console.log('Original code:', codeSnippetText)
        console.log('Formatted code:', formattedCode)
        const messageObject = {
            uid: userId,
            text: formattedCode,
            time: new Date().toLocaleTimeString(),
            isCodeSnippet: true
        };
        push(ref(realtimeDB, 'messages'), messageObject)
            .then(() => setNewMessage(''))
            .catch(error => {
                console.error('Error pushing message:', error);
            });
        setIsCodeSnippetModalOpen(false);
        setCodeSnippetText('');
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const messageObject = {
            uid: userId,
            text: newMessage,
            time: new Date().toLocaleTimeString(),
        };
        // Push the new message object to the 'messages' location in the database
        push(ref(realtimeDB, 'messages'), messageObject)
            .then(() => setNewMessage(''))
            .catch(error => {
                console.error('Error pushing message:', error);
            });
        
        

        
        
    };


    return (
        <div className="chat-container pt-20 pr-2 pl-2">
            <ul className="chat-messages flex flex-col-reverse gap-3 overflow-y-auto ">
                {messages.map((message, index) => (
                    <li key={message.id || index}
                        className={`message-item ${message.uid === userId ? 'self-end' : ''} max-w-sm 
                            ${message.uid === userId ? 'bg-indigo-500 text-white' : 'bg-gray-200'} p-3 rounded-tl-lg rounded-br-lg shadow-md`}
                    >
                        {message.isCodeSnippet ? (
                            <pre><code>{message.text}</code></pre>
                        ) : (
                            <p>{message.text}</p>
                        )}
                        <span className={`time-stamp text-xs 
                            ${message.uid === userId ? 'text-gray-300' : 'text-gray-600'}`}>
                            {message.time}
                        </span>
                    </li>
                ))}
            </ul>

            <div className="input-area flex items-center right-0 w-3/4 fixed bottom-1">
                
                <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-indigo-500"
                />
                <div className='bg-black rounded-lg p-2'>
                    <button className="btn btn-secondary mr-2 text-white" onClick={() => setIsCodeSnippetModalOpen(true)}>
                        Add Code Snippet
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="btn btn-primary ml-2 text-white">
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
            
            {/* ... form for sending messages ... */}
        </div>
    );
};

export default CodingClub;
