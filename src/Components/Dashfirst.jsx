import React from "react";
import {
  Addpost,
  GoogleIcon,
  GroupChat,
  Proom,
  Vidchat,
} from "../assets/Icons";
import { useState } from "react";

import { useUserContext } from "../userContext";
import { db, auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import EventForm from "./eventform";
import PostForm from "./PostForm";
import GroupsOutlinedIcon from "@mui/icons-material/GroupOutlined";

const Dashfirst = ({ username, isPostFormOpen, setIsPostFormOpen }) => {

  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const { userId } = useUserContext();
  const navigate = useNavigate();
  // const [isPostFormOpen, setIsPostFormOpen] = useState(false);

  // Logout Button
  const logoutButton = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div>
      <div className=" flex flex-row mt-[80px] font-medium text-white justify-center">
        <img
          src={GoogleIcon}
          alt="Event image"
          className="rounded-full w-[50px] h-[50px] mr-3"
        />
        <div className="ml-1 flex flex-col my-auto">
          <h1 className=" font-montserrat text-lg">{username}</h1>
          <p className=" text-xs">BCA</p>
        </div>
      </div>
      {/*  */}
      <div className=" grad w-fit mx-aut o mt-4 rounded-lg mb-10 opa-black-shad">
        <p className="py-4 px-8 text-center text-2xl text-white font-semibold font-montserrat">
          UNIVERSITY
        </p>
      </div>
      <PostForm isOpen={isPostFormOpen} onClose={() => setIsPostFormOpen(false)} />
      <EventForm isOpen={isEventFormOpen} onClose={() => setIsEventFormOpen(false)} />

      <div className=" flex flex-col border-2 border-white m-4 glass rounded-lg">
        {/* <div className="flex flex-row mx-3 mt-3 ">

          <GroupsOutlinedIcon className=" " />
          <p className=" text-white text-xl my-auto font-montserrat font-semibold text-left">
            Group Chat
          </p>
        </div> */}
        <div className="flex flex-row mx-3 mt-3 ">
          <img
            src={Proom}
            alt="groupchat icon"
            className="mx-5 h-[50px] w-[60px]"
          />
          <button
            onClick={() => {
              navigate("/channels");
            }}
            className=" text-white text-xl my-auto font-montserrat font-semibold text-left"
          >
            Channels
          </button>
        </div>
        <div className="flex flex-row mx-3 mt-3 ">
          <img
            src={Vidchat}
            alt="groupchat icon"
            className="mx-5 h-[50px] w-[60px]"
          />
          <p className=" text-white text-xl my-auto font-montserrat font-semibold text-left">
            Video Meetings
          </p>
        </div>
        <button
          onClick={() => setIsPostFormOpen(true)}>
          <div className="flex flex-row mx-3 mt-3 ">
            <img
              src={Addpost}
              alt="groupchat icon"
              className="mx-5 h-[50px] w-[60px]"
            />
            <p className=" text-white text-xl my-auto font-montserrat font-semibold text-left">
              Add Post
            </p>
          </div>
        </button>
            {/* Add Event Button  */}
        <button
          onClick={() => setIsEventFormOpen(true)}>
          <div className="flex flex-row mx-3 mt-3 ">
            <img
              src={Addpost}
              alt="groupchat icon"
              className="mx-5 h-[50px] w-[60px]"
            />
            <p className=" text-white text-xl my-auto font-montserrat font-semibold text-left">
              Add Event
            </p>
          </div>
        </button>

        <button
          onClick={logoutButton}
          className=" text-white opa-black-shad grad font-semibold font-montserrat py-2 px-1 m-4 rounded-lg"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Dashfirst;
