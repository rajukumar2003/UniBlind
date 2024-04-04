import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Rnd } from 'react-rnd'; 
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useUserContext } from '../userContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';

const CreateConfession = () => {
    const [query, setQuery] = useState('mountains panorama forest');
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [imageType, setImageType] = useState('vector');
    const [text, setText] = useState('');
    const [fontColor, setFontColor] = useState('#000000');
    const [fontStyle, setFontStyle] = useState('normal');
    const [fontSize, setFontSize] = useState(20); // Default font size
    const [onclicktext, setOnclicktext] = useState(''); // Default font size

    const { userId } = useUserContext();
    const navigate = useNavigate();

    // Function to fetch images from Pixabay API
    const fetchImages = async () => {
        try {
            const response = await axios.get(`https://pixabay.com/api/?key=43165237-17f81b2abec55470a14d3eabc&q=${query}&image_type=${imageType}&per_page=30`);
            setImages(response.data.hits);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };


    const sendConfession = async () => {
        // 1. Image Upload (If Image Exists)
        let imageUrl = null;
        if (selectedImage) {
            try {
                const response = await axios.get(selectedImage.largeImageURL, {
                    responseType: 'blob' // Set responseType to 'blob' to get binary data
                });
                const imageBlob = response.data; // Get the image data as a Blob
                // Upload the image Blob to Firebase Storage
                const storage = getStorage();
                // Generate a unique file name for the image
                const timestamp = Date.now();
                const imageName = `${userId}_${timestamp}_${selectedImage.name}`;

                const imageRef = ref(storage, `CreateConfession/${imageName}`);
                await uploadBytes(imageRef, imageBlob);

                // Get the download URL of the uploaded image
                imageUrl = await getDownloadURL(imageRef);
            } catch (error) {
                console.error("Error uploading image:", error);
                // Handle image upload error (e.g., display alert)
                return; // Consider stopping form submission on image upload error
            }
        }

        // 2. Store Post in Firestore
        try {
            const confessionsCollectionRef = collection(db, 'confessions');
            await addDoc(confessionsCollectionRef, {
                imagePath: imageUrl,
                text: text,
                fontColor: fontColor,
                fontStyle: fontStyle,
                fontSize: fontSize,
                user: userId, // From authentication
                createdAt: new Date()
            });
            alert('Confession sent!');
            setImages([]);
            setText('');
            navigate('/channels');
        } catch (error) {
            console.error('Error sending confession:', error);
        }
    };



    // Function to handle image selection
    const handleImageSelect = (image) => {
        setSelectedImage(image);
    };

    // Function to handle search button click
    const handleSearch = () => {
        fetchImages();
    };

    // useEffect to fetch images when the component mounts
    useEffect(() => {
        fetchImages();
    }, [imageType]);




    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
            {/* Left section for displaying images */}
            <div className="max-h-screen overflow-y-auto w-2/3 p-2 ml-3">
                <div className="flex items-center mb-7 mt-5">
                    <input
                        type="text"
                        placeholder="Search images..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="px-4 py-2 w-full rounded-l-lg border border-gray-300 focus:outline-none focus:ring-indigo-500"
                    />
                    <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">Search</button>
                    {/*  */}
                    <label htmlFor="image-type" className="mr-4 font-bold">Image-Type</label>
                    <select id="font-style" className="rounded-lg" onChange={(e) => { setImageType(e.target.value) }}>
                        <option value="vector">Vector</option>
                        <option value="photo">Photo</option>
                        <option value="illustration">illustration</option>
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image.previewURL}
                            alt={image.tags}
                            className="cursor-pointer hover:opacity-80 relative"
                            onClick={() => handleImageSelect(image)}
                        />
                    ))}
                </div>
            </div>

            {/* Center section for displaying selected image */}
            {selectedImage && (
                <div className=" inset-0 flex justify-center items-center bg-black bg-opacity-50 relative">
                    <img src={selectedImage.largeImageURL} alt={selectedImage.tags} className="max-h-full max-w-full" />
                    <Rnd
                        default={{
                            x: 0,
                            y: 0,
                            width: 200,
                            height: 200,
                        }}
                        minWidth={50}
                        minHeight={50}
                        bounds="parent"
                    >
                        <textarea
                            placeholder='Enter your text here...'
                            rows={5}
                            cols={30}
                            id="confession-textarea"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="absolute bg-transparent text-black px-2 py-2 rounded-lg"
                            style={{
                                color: fontColor,
                                fontSize: `${fontSize}px`,
                                fontStyle: `${fontStyle}`,
                                fontFamily: fontStyle, 
                                zIndex: 999,
                                resize: 'none',
                                overflow: 'hidden'
                            }}
                        />
                    </Rnd>
                </div>
            )}

            {/* Right section for sizes, font tools, and send button */}
            <div className="w-2/3 p-9">
                {/* Font Tools section */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Font Tools</h2>
                    <div className="flex items-center mb-5 ">
                        <label htmlFor="font-color" className="mr-2">Font Color:</label>
                        <input
                            onChange={(e) => { setFontColor(e.target.value) }}
                            value={fontColor}
                            type="color" id="font-color" className="rounded-lg" />
                    </div>

                    <div className="flex items-center mb-4">
                        <label htmlFor="font-style" className="mr-2">Font Style:</label>
                        <select
                            onChange={(e) => { setFontStyle(e.target.value) }}
                            value={fontStyle}
                            id="font-style" className="rounded-lg">
                            <option value="normal">Normal</option>
                            <option value="Pacifico">Pacifico</option>
                            <option value="Homemade Apple">Homemade Apple</option>
                            <option value="Dancing Script">Dancing Script</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="font-size" className="mr-2">Font Size:</label>
                        <input
                            type="number"
                            value={fontSize}
                            onChange={(e) => setFontSize(parseInt(e.target.value))}
                            id="font-size"
                            className="rounded-lg border border-gray-300 px-2 py-1"
                        />
                    </div>
                </div>
                
                <button onClick={sendConfession} type='button' className="bg-blue-500 text-white px-4 py-2 rounded-lg">Send</button>
            </div>
        </div>
    );
};

export default CreateConfession;
