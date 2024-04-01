import { Fav, upvoteicon } from "../assets/Icons";
import { useUserContext } from "../userContext";
import { useState } from "react";


const PostCard = ({ imgURL, title, message, upvote, username, postId, handleUpvote }) => {
  const { userId } = useUserContext();
  const [upvoteCount, setUpvoteCount] = useState(upvote);
  const [hasUpvoted, setHasUpvoted] = useState(upvote.includes(userId));
	
  return (
    <div className="border-2 p-4 pb-2 mb-3 w-full h-full">
      <em className="text-md text-slate-gray font-semibold">{username}</em>
      <div className="flex flex-row">
        <div className="flex flex-row mt-2">
          <div>
            <img
              src={imgURL}
              alt="post image"
              className="rounded-md object-contain w-[300px] h-[200px] black-shad mr-10"
            />
          </div>
        </div>

        <div className="flex flex-col ml-5">
          <h3 className="mt-1 font-montserrat text-lg font-semibold">
            {title}
          </h3>
          <p className="mt-6 max-w-md text-sm font-montserrat">{message}</p>
        </div>
      </div>
      <div className="mt-3 justify-start">
        <button
          onClick={() => {
            handleUpvote();
            setHasUpvoted(true);
          }}
          disabled={hasUpvoted}
          className={`upvote-button ${hasUpvoted ? "upvoted" : ""}`}
        >
          <div className="flex mt-2">
            <img
              src={Fav}
              width={30}
              height={30}
              alt="upvoting icon"
              className="object-contain mr-2"
            />
            <p className="my-auto">{upvote.length}</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
