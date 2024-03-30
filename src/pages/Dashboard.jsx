import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Addpost, GroupChat, Logo, Proom, Vidchat } from "../assets/Icons";
import { events, posts } from "../Constans";
import PostCard from "../Components/PostCard";
import EventCard from "../Components/EventCard";
import { useState, useEffect } from "react";
import { fetchPosts } from "../postsUtils";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
import { useUserContext } from "../userContext";

const Dashboard = ({ isPostFormOpen, setIsPostFormOpen }) => {
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);
  const { userId } = useUserContext();

  const navigate = useNavigate();

  // Fetching Posts-------------------------------------------------------------------
  useEffect(() => {
    const getPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
        // setUsername
        console.log(userId);
        const username = await fetchUsername(userId);
        setUsername(username);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, []);

  // Fetching Username-------------------------------------------------------------------
  async function fetchUsername(userId) {
    const db = getFirestore();
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data().username;
    } else {
      return null;
    }
  }

  // Logout Button
  const logoutButton = async () => {
    await signOut(auth);
    navigate("/login");
  };

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
              <h1 className="">{username}</h1>
              <p className=" text-xs">BCA</p>
            </div>
          </div>
          {/*  */}
          <div className=" glass w-fit mx-auto border-white border-2 rounded-lg">
            <div className=" grad py-4 px-8 rounded-lg">
              <p className="text-center text-2xl text-white font-semibold font-montserrat">
                UNIVERSITY
              </p>
            </div>
          </div>

          <div className=" flex flex-col border-2 glass m-4">
            <div className="flex flex-row m-2">
              <img
                src={GroupChat}
                alt="groupchat icon"
                className="mx-5"
                width={50}
                height={50}
              />
              <p className=" text-white text-xl text-left my-auto font-montserrat font-semibold">
                Group Chat
              </p>
            </div>
            <div className="flex flex-row m-2">
              <img
                src={Proom}
                alt="Private Room icon"
                className="mx-5"
                width={50}
                height={50}
              />
              <p className=" text-white text-xl text-left my-auto font-montserrat font-semibold">
                Private Room
              </p>
            </div>
            <div className="flex flex-row m-2">
              <img
                src={Vidchat}
                alt="Vidchat icon"
                className="mx-5"
                width={50}
                height={50}
              />
              <p className=" text-white text-xl text-left my-auto font-montserrat font-semibold">
                Video Meeting
              </p>
            </div>
            <button
              onClick={() => {
                navigate("/post");
                setIsPostFormOpen(true);
              }}
            >
              <div className="flex flex-row m-2">
                <img
                  src={Addpost}
                  alt="Add post icon"
                  className="mx-5"
                  width={50}
                  height={50}
                />
                <p className=" text-white text-xl text-left my-auto font-montserrat font-semibold">
                  Add Post
                </p>
              </div>
            </button>
            <button
              onClick={logoutButton}
              className=" text-white font-medium py-2 px-5 rounded-full shadow-md font font-montserrat font-semibold"
            >
              Logout
            </button>
          </div>
        </section>
        <section className=" w-3/5 mx-auto ">
          <div className="mx-10">
            <p className=" mt-20 text-[#86B6F6] font-semibold mb-5  font-montserrat text-2xl">
              TRENDING
            </p>

            <div className=" flex flex-col">
              {posts.map((post, index) => (
                <PostCard
                  key={index}
                  imgURL={post.imagePath}
                  title={post.title}
                  message={post.description}
                  upvote={post.upvote}
                  username={post.username}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="flex-1 bg-[#86B6F6] w-1/5 h-screen fixed right-0">
          <div className="mt-20 glass w-fit mx-auto rounded-lg mb-5 border-2 border-white">
            <div className=" rounded-lg grad py-3 px-5">
              <p className="text-center text-2xl text-white font-semibold font-montserrat">
                UNIVERSITY EVENTS
              </p>
            </div>
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

          <div className="text-xl glass text-white flex flex-col items-center m-5 border-2 border-white rounded-lg py-5 font-montserrat">
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
