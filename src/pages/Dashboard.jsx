import React from "react";
import { Link } from "react-router-dom";
import { Addpost, GroupChat, Logo, Proom, Vidchat } from "../assets/Icons";
import { events, posts } from "../Constans";
import PostCard from "../Components/PostCard";
import EventCard from "../Components/EventCard";
import { useState, useEffect } from "react";

const Dashboard = () => {
  return (
    <main>
      <nav className="bg-[#B4D4FF] top-0 w-full h-100 flex z-10 fixed">
        <img src={Logo} alt="UniBLind Logo" className=" h-[55px] w-auto" />
        <p className="text-white m-auto font-semibold text-xl">UniBlind</p>
      </nav>
      <div className="flex flex-row">
        <section className="h-screen bg-[#86B6F6] w-1/5 fixed">
          {/*  */}
          <div className="flex flex-row mt-[50px] font-medium text-white ">
            <img
              src={Logo}
              alt="Event image"
              className="rounded-full w-[80px] h-[80px] mr-5"
            />
            <div className="ml-5 flex flex-col my-auto">
              <h3 className="">Mighty Raju</h3>
              <p className=" text-xs">BCA</p>
            </div>
          </div>
          {/*  */}
          <div className=" card w-fit mx-auto py-5 px-12 rounded-lg">
            <p className="text-center text-2xl text-black font-semibold">
              University
            </p>
          </div>

          <div className=" flex flex-col border-2 border-r-green-50 m-4">
            <div className="flex flex-row mx-auto">
              <img
                src={GroupChat}
                alt="groupchat icon"
                className="mr-10"
                width={70}
                height={70}
              />
              <p className=" text-white text-2xl my-auto">Group Chat</p>
            </div>
            <div className="flex flex-row mx-auto">
              <img
                src={Proom}
                alt="Private Room icon"
                className="mr-10"
                width={70}
                height={70}
              />
              <p className=" text-white text-2xl my-auto">Private Room</p>
            </div>
            <div className="flex flex-row mx-auto">
              <img
                src={Vidchat}
                alt="Vidchat icon"
                className="mr-10"
                width={70}
                height={70}
              />
              <p className=" text-white text-2xl my-auto">Video Meeting</p>
            </div>
            <div className="flex flex-row mx-auto">
              <img
                src={Addpost}
                alt="Add post icon"
                className="mr-10"
                width={70}
                height={70}
              />
              <p className=" text-white text-2xl my-auto">Add Post</p>
            </div>
            <p className=" text-white text-2xl m-auto">Back</p>
          </div>
        </section>
        <section className=" w-3/5 mx-auto ">
          <div className="mx-10">
            <p className=" mt-24 ml-10 text-[#86B6F6] font-semibold mb-10 ">
              TRENDING
            </p>

            <div className=" flex flex-col">
              {posts.map((post, index) => (
                <PostCard
                  key={index}
                  imgURL={post.imgURL}
                  title={post.title}
                  message={post.message}
                  upvote={post.upvote}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="flex-1 bg-[#86B6F6] w-1/5 h-screen fixed right-0">
          <div className=" mt-20 card w-fit mx-auto py-5 px-12 rounded-lg mb-5">
            <p className="text-center text-2xl text-black font-semibold">
              University Events
            </p>
          </div>

          {/*  */}

          <div className=" ml-4 flex flex-col no-scrollbar overflow-y-auto h-2/5">
            {events.map((event, index) => (
              <EventCard
                key={index}
                imgURL={event.imgURL}
                title={event.title}
                org={event.org}
                date={event.date}
                venue={event.venue}
              />
            ))}
          </div>

          {/*  */}

          <div className="text-xl text-white flex flex-col items-center m-5 border-2 border-white rounded-lg py-5">
            <Link to="/">Feedback</Link>
            <Link to="/">Help</Link>
            <Link to="/">Customer Care</Link>
            <Link to="/">Contact-Us</Link>
            <Link to="/">About-Us</Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
