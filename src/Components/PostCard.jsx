import { upvoteicon } from "../assets/Icons";
import { useUserContext } from "../userContext";
import { useState } from "react";

const PostCard = ({ imgURL, title, message, upvote, username, postId, handleUpvote }) => {
  const { userId } = useUserContext(); 
  const [upvoteCount, setUpvoteCount] = useState(upvote);
  const [hasUpvoted, setHasUpvoted] = useState(upvote.includes(userId)); 


  return (
    <div className="border-2 p-4 mb-3">
      <em className="text-md text-slate-gray font-semibold">{username}</em>
      <div className="flex flex-row mb-10 mt-2">
        <div>
          <img
            src={imgURL}
            alt="post image"
            className="rounded-md object-contain w-[300px] h-[200px] black-shad mr-10"
          />
        </div>

        {/* <div className="flex flex-col w-[60%] h-full">
          <h3 className="mt-1 font-montserrat text-lg font-semibold">
            {title}
          </h3>
          <p className="mt-6 max-w-md text-sm font-montserrat">{message}</p>
        </div> */}
      </div>

      <div className="flex flex-col">
        <h3 className="mt-1 font-palanquin text-xl font-semibold">{title}</h3>
        <p className="mt-6 max-w-md info-text">{message}</p>
        <div className="mt-3 flex gap-2.5">
          <button
            onClick={() => {
              handleUpvote();
              setHasUpvoted(true);       
            }}
            disabled={hasUpvoted}
            className={`upvote-button ${hasUpvoted ? 'upvoted' : ''}`}>
            <img
              src={upvoteicon}
              width={24}
              height={24}
              alt="upvoting icon"
              className="object-contain m-0"
            />
            <p>{upvote.length}</p>
          </button>
          
        </div>
        <em className="text-xl text-slate-gray">by {username}</em>
      </div>
      </div>
  );
};

export default PostCard;
