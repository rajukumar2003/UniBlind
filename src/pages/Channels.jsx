import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import "./Channels.css";

const Channels = () => {
    const [selectedChannel, setSelectedChannel] = useState('Confessions');
    const [channelsData, setChannelsData] = useState([
        { name: 'Confessions', id: 'confessions' },
        { name: 'Coding Club', id: 'coding' },
        { name: 'SWO', id: 'swo' },
    ]);
    const [messages, setMessages] = useState([]); // Placeholder for now

    const navigate = useNavigate();

    // Fetch messages when channel changes (simulated for now)
    useEffect(() => {
        const fetchData = async () => {
            //  In reality, you'd fetch messages from your backend based on selectedChannel

            setMessages([ // Placeholder messages 
                { text: 'This is a sample message in the selected channel', user: 'Arjit Singhal' },
                { text: 'Let the discussions begin!', user: 'ExcitedUser' },
            ]);
        };

        fetchData();
    }, [selectedChannel]);

    return (
        <div className="channels-container min-h-screen bg-gray-100 flex">
            <div className="channels-list-wrapper flex flex-col items-start p-4 w-1/4 shadow-md bg-black">
                <h2 className="text-xl text-white font-bold mb-4">Channels</h2>
                <ul className="channels-list">
                    {channelsData.map(channel => (
                        <li
                            key={channel.id}
                            className={`channel-item p-2 text-white rounded-lg hover:bg-green-500 transition-colors duration-200 cursor-pointer ${selectedChannel === channel.name ? 'bg-indigo-500 text-white' : ''
                                }`}
                            onClick={() => setSelectedChannel(channel.name)}
                        >
                            <b>#{channel.name}</b>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="message-area flex-1 p-4 overflow-y-auto relative">
                <h2 className="text-lg font-semibold mb-4">{selectedChannel}</h2>
                <div className="messages-display">
                    {messages.map((msg, index) => (
                        <div className="message p-2 rounded-lg bg-gray-200 mb-2 animate-fade-in-up" key={index}>
                            <span className="message-user font-medium">{msg.user}: </span>
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div className="input-area flex items-center mt-4 absolute bottom-5 left-0 w-full">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-indigo-500"
                    />
                    <button
                        onClick={() => { navigate('/confession/create') }}
                        className='ml-2 mr-2 text-white'>Create</button>
                    <button className="btn btn-primary ml-2">Send</button>
                </div>
            </div>
        </div>
    );
};

export default Channels;
