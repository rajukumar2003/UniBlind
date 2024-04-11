import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import Confession from '../Components/Confession';
import CodingClub from '../Components/CodingClub';
import Announcement from '../Components/Announcement';

const Channels = () => {
    const [selectedChannel, setSelectedChannel] = useState('Coding Club');
    const [channelsData, setChannelsData] = useState([
        { name: 'Announcement', id: 'announcement' },
        { name: 'Confessions', id: 'confessions' },
        { name: 'Coding Club', id: 'coding' },
    ]);
    const navigate = useNavigate();

    

    
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
                
                {selectedChannel === 'Announcement' && <Announcement />}
                {selectedChannel === 'Confessions' && <Confession />}
                {selectedChannel === 'Coding Club' && <CodingClub />}
               
                    
            </div>
        </div>
    );
};

export default Channels;
