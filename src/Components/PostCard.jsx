import { Fav, upvoteicon } from "../assets/Icons";
import { useUserContext } from "../userContext";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from '@mui/icons-material/Delete';
import Report from '@mui/icons-material/Report';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FormControlLabel from "@mui/material/FormControlLabel";
import { IconButton, Button } from "@mui/material";
import { useState } from "react";
import { doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const PostCard = ({ imgURL, title, message, upvote, username, postId, postOwnerUserId, handleUpvote }) => {
  const {userId} = useUserContext();
  const [upvoteCount, setUpvoteCount] = useState(upvote);
  const [hasUpvoted, setHasUpvoted] = useState(upvote.includes(userId));
  const [isImageClicked, setIsImageClicked] = useState(false);
  const [isDeleteMenuOpen, setIsDeleteMenuOpen] = useState(false);

  const toggleDeleteMenu = () => {
    setIsDeleteMenuOpen(!isDeleteMenuOpen);
  };

  const toggleImgeClick = () => {
    setIsImageClicked(!isImageClicked);
  };

  const handleDeleteClick = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;}
    try {
      const postRef = doc(db, 'posts', postId);
      await deleteDoc(postRef);
      console.log('Post deleted successfully');
      // ... (Local state update if needed) ...  
    } catch (error) {
      console.error('Error deleting post:', error);
    }
    setIsDeleteMenuOpen(false);
  };

  const handleReport = async () => {
    if (!window.confirm('Are you sure you want to report this post?')) {
      return;
    }
    try {
      const postRef = doc(db, 'posts', postId);
      const postSnap = await getDoc(postRef);
      const { reports } = postSnap.data();
      if (reports > 2) {
        await deleteDoc(postRef);
        alert('Post deleted due to multiple reports');
        return;
      }
      await updateDoc(postRef, { reports : reports + 1});
      
      alert('Post reported successfully');
    } catch (error) {
      console.error('Error reporting post:', error);
    }
    setIsDeleteMenuOpen(false);
  };


  
  return (
    <div className=" p-4 pb-2 mb-3 w-full h-full">
      <h1 className="text-md text-slate-gray font-semibold">{username}</h1>
      <div className="flex flex-row">
        <div className="flex flex-row mt-2">
          <div>
            {imgURL && imgURL.toLowerCase().endsWith(".mp4") ? (
              <video controls muted className="rounded-md object-contain w-[300px] h-[200px] black-shad mr-10">
                <source src={imgURL} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={imgURL}
                alt="post image"
                className={`rounded-md object-contain w-[300px] h-[200px] black-shad mr-10 cursor-pointer ${isImageClicked ? 'w-full h-full' : ''}`}
                onClick={toggleImgeClick}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col ml-5">
          <h3 className="mt-1 font-montserrat text-lg font-semibold">
            {title}
          </h3>
          <p className="mt-6 max-w-md text-sm font-montserrat">{message}</p>
        </div>
      </div>
      {/* Delete Menu */}
        <div className="flex flex-row-reverse object-right">
          <IconButton onClick={toggleDeleteMenu} >
            <MoreVertIcon fontSize="small"/>
          </IconButton>

          <div className={` left-0 bg-white shadow-md rounded p-2 ${isDeleteMenuOpen ? 'block' : 'hidden'}`}>
          {userId === postOwnerUserId ? (
            <div>
              <Button
                variant="text"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteClick}
              >
                Delete
              </Button>
            </div>
          ) :
            <div >
              <Button
                variant="text"
                color="error"
                startIcon={<Report />}
                onClick={handleReport}
              >
                Report
              </Button>
            </div>
          }
          </div>
        </div>
      {/* End of Delete Menu */}
      
      <div className="mt-3 justify-start">
        <button
          onClick={() => {
            handleUpvote();
            setHasUpvoted(true);
          }}
          disabled={hasUpvoted}
          className={`upvote-button ${hasUpvoted ? "upvoted" : ""}`}
        >
          <div className="flex">
            <div className="flex mr-3">
              <p className="my-auto">{upvote.length}</p>
            </div>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  name="checkedH"
                  checked={hasUpvoted}
                />
              }
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
