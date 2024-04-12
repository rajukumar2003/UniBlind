import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import Confession from "../Components/Confession";
import CodingClub from "../Components/CodingClub";
import Announcement from "../Components/Announcement";
import { Logo } from "../assets/Icons";
import { IoSearchSharp } from "react-icons/io5";

const Channels = () => {
  const [selectedChannel, setSelectedChannel] = useState("Announcement");
  const [channelsData, setChannelsData] = useState([
    { name: "Announcement", id: "announcement" },
    { name: "Confessions", id: "confessions" },
    { name: "Coding Club", id: "coding" },
  ]);
  const navigate = useNavigate();

  

  return (
    <div className="channels-container h-screen bg-gray-100 flex ">
      <div className="channels-list-wrapper flex flex-col items-start p-4 w-1/5 shadow-md bg-black">
        <div className=" w-full mb-1">
          <button
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <img src={Logo} className="ml-3 mr-10 h-20 w-20" />
          </button>
          <h2 className="text-3xl text-white font-bold my-auto ml-5">
            Channels
          </h2>
        </div>

        <div className="w-[80%] pt-2 relative ml-5 text-gray-600">
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
          />
          <button type="submit" className="absolute right-0 top-0 mt-5">
            <IoSearchSharp />
          </button>
        </div>

        <ul className="ml-4 w-full">
          {channelsData.map((channel) => (
            <li
              key={channel.id}
              className={`p-2 pl-2 my-3 text-white rounded-lg hover:bg-white hover:text-black transition-colors duration-200 w-[90%] cursor-pointer ${selectedChannel === channel.name ? "bg-indigo-500 text-white" : ""}`}
              onClick={() => setSelectedChannel(channel.name)}
            >
              <b>#{channel.name}</b>
            </li>
          ))}
        </ul>
      </div>

      <div className="message-area flex-1 overflow-y-auto relative">
        <h2 className="text-3xl font-bold mb-4 fixed z-10 w-full bg-black p-4 font-montserrat text-white">
          {selectedChannel}
        </h2>

        {selectedChannel === "Announcement" && <Announcement />}
        {selectedChannel === "Confessions" && <Confession />}
        {selectedChannel === "Coding Club" && <CodingClub />}
      </div>
    </div>
  );
};

export default Channels;
