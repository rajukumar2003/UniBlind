import React, { useState, useRef } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../userContext'

const postsCollectionRef = collection(db, 'posts');

const PostForm = ({ isOpen, onClose }) => {
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
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
                return; // Consider stopping form submission on image upload error 
            }
        }

        // 2. Store Post in Firestore
        try {
            await addDoc(postsCollectionRef, {
                title,
                description,
                imagePath: imageUrl,
                createdAt: new Date(), 
                userId: userId
            });
            alert("Post created Successfully");
            // Reset form 
            setTitle('');
            setDescription('');
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
    }

    return (
        <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-wrap">
                <div className="image-preview-container w-1/3 p-2 flex items-center justify-center">
                    {imagePreview && (
                        <img src={imagePreview} alt="Image Preview" className="max-w-full max-h-full object-contain" />
                    )}
                </div>

                <div className="content-container w-2/3 p-2">
                    <button className="absolute top-3 right-3 text-2xl font-semibold" onClick={() => { onClose; navigate("/dashboard")}}>
                        &times;
                    </button>

                    <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Title"
                            className="w-full p-3 border border-gray-300 rounded-md mb-3"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <textarea
                            placeholder="Description"
                            className="w-full p-3 border border-gray-300 rounded-md mb-3 overflow-y-auto"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <label className="flex items-center justify-between w-full cursor-pointer">
                            <span className="text-gray-600">Upload Image</span>
                            <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            <span className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Browse</span>
                        </label>

                        <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 mt-4 w-full font-medium">
                            Send &rarr;
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );

};

export default PostForm;
