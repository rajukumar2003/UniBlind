import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getFirestore, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';

const Channels = () => {
    const [selectedChannel, setSelectedChannel] = useState('Confessions');
    const [channelsData, setChannelsData] = useState([
        { name: 'Confessions', id: 'confessions' },
        { name: 'Coding Club', id: 'coding' },
        { name: 'SWO', id: 'swo' },
    ]);
    const [confessions, setConfessions] = useState([]);
    const navigate = useNavigate();

    // Function to fetch confessions from Firestore
    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getFirestore();
                const confessionsRef = collection(db, 'confessions');
                const q = query(confessionsRef, orderBy('createdAt', 'desc'));
                const unsubscribe = onSnapshot(q, (snapshot) => {
                    const data = [];
                    snapshot.forEach((doc) => {
                        const confessionData = doc.data();
                        data.push(confessionData);
                    });
                    setConfessions(data);
                });
                return () => unsubscribe();
            } catch (error) {
                console.error('Error fetching confessions:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="channels-container h-screen bg-gray-100 flex ">
            <div className="channels-list-wrapper flex flex-col items-start p-4 w-1/4 shadow-md bg-black">
                <h2 className="text-xl text-white font-bold mb-4">Channels</h2>
                <ul className="channels-list">
                    {channelsData.map(channel => (
                        <li
                            key={channel.id}
                            className={`channel-item p-2 text-white rounded-lg hover:bg-green-500 transition-colors duration-200 cursor-pointer ${selectedChannel === channel.name ? 'bg-indigo-500 text-white' : ''}`}
                            onClick={() => setSelectedChannel(channel.name)}
                        >
                            <b>#{channel.name}</b>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="message-area flex-1 overflow-y-auto relative">

                <h2 className="text-2xl font-semibold mb-4 fixed z-10 w-full bg-white p-4 font-montserrat">{selectedChannel}</h2>
                <div className="messages-display z-0 mt-20">
                    {confessions.map((confession, index) => (
                        <div className="message p-2 rounded-lg bg-gray-200 mb-2 animate-fade-in-up " key={index}>
                            <div className="confession-container relative">
                                <img src={confession.imagePath} alt="Confession" className="confession-image h-[400px]" />
                                <span
                                    className="confession-text absolute top-0 left-0 p-2 z-10"
                                    style={{
                                        color: confession.fontColor,
                                        fontFamily: confession.fontStyle,
                                        fontSize: `${confession.fontSize}px`
                                    }}
                                >
                                    {confession.text}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                    <div className="input-area flex items-center right-0 w-3/4 fixed bottom-0">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-indigo-500"
                        />
                        <div className='bg-black rounded-lg p-2'>
                            <button
                                onClick={() => { navigate('/confession/create') }}
                                className='ml-2 mr-2 text-white'>Create</button>
                            <button className="btn btn-primary ml-2 text-white">Send</button>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default Channels;
