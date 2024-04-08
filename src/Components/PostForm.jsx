import React, { useState, useRef } from "react";
import { getFirestore, collection, addDoc, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../userContext";
import { Browsing, Sent } from "../assets/Icons/index";

const postsCollectionRef = collection(db, "posts");

const PostForm = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { userId } = useUserContext();
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Image Upload (If Image Exists)
    let imageUrl = null;
    if (image) {
      try {
        const storage = getStorage();
        const imageRef = ref(storage, `postImages/${image.name}`);
        const uploadResult = await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      } catch (error) {
        console.error("Error uploading image:", error);
        // Handle image upload error (e.g., display alert)
        return; 
      }
    }

    // 2. Store Post in Firestore
    // Getting username from user document
    try {
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
        throw new Error("User not found in database");
      }
      const { username } = userDocSnap.data();
      // Collection: posts
      await addDoc(postsCollectionRef, {
        title,
        description,
        imagePath: imageUrl,
        createdAt: new Date(),
        username: username,
        userId: userId,
        upvotes: [],
      });
      alert("Post created Successfully");
      // Reset form
      setTitle("");
      setDescription("");
      setImage(null);
      setImagePreview(null);
      onClose();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting post:", error);
      // Handle general Firestore error (e.g., display alert)
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    // Create a preview URL for the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="glass rounded-lg z-0">
        <div className=" m-2 bg-white shad bg-opacity-90 flex flex-col rounded-lg">
          <h2 className="py-3 text-2xl font-semibold text-center">NEW POST</h2>
          <div className=" py-4 border-t-[1px] border-black flex flex-row ">
            <div className="image-preview-container w-[300px] h-auto p-2 flex items-center justify-center">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>

            <div className="content-container w-[400px] p-2">
              <button
                className="absolute top-3 right-3 text-2xl font-semibold"
                onClick={() => {
                  onClose;
                  navigate("/dashboard");
                }}
              >
                &times;
              </button>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Type Your Title..."
                  className="w-full p-2 border-b-[1px] border-black mb-3 bg-transparent focus:border-b focus:border-black"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                  placeholder="Type Description..."
                  className="w-full p-2 border-b-[1px] border-black mb-3 bg-transparent overflow-y-auto"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <div className="flex flex-row justify-between">
                  <label className="flex items-center justify-between w-fit cursor-pointer">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <img src={Browsing} alt="Browse" className=" h-7 w-auto" />
                  </label>

                  <button type="submit">
                    <img src={Sent} alt="Alt" className="h-7 w-auto" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
