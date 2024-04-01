import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
import { IoIosExpand } from "react-icons/io";

const CreateConfession = () => {
    const [query, setQuery] = useState('mountains panorama forest');
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [imageType, setImageType] = useState('vector');
    const [text, setText] = useState('');
    const [fontColor, setFontColor] = useState('#000000');
    const [fontStyle, setFontStyle] = useState('normal');
    const [fontSize, setFontSize] = useState(16); // Default font size

    const textareaRef = useRef(null);
    const [initialHeight, setInitialHeight] = useState(40); // Example initial height

    // Function to fetch images from Pixabay API
    const fetchImages = async () => {
        try {
            const response = await axios.get(`https://pixabay.com/api/?key=43165237-17f81b2abec55470a14d3eabc&q=${query}&image_type=${imageType}&per_page=30`);
            setImages(response.data.hits);
        } catch (error) {
            console.error('Error fetching images:', error);
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

    // Function to handle applying text changes to the image
    const applyTextChanges = () => {
        // Update selected image with the modified text
        setSelectedImage(prevImage => ({
            ...prevImage,
            text: text
        }));
    };

    // Function to handle pressing Enter key in the text input
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default behavior (form submission)
            setText(text + '\n'); // Append newline character
        }
    };

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
                        <option value="photo">Photo</option>
                        <option value="vector">Vector</option>
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
                    <Draggable>
                        <textarea
                            rows={50}
                            cols={50}
                            id="confession-textarea"
                            ref={textareaRef}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onClick={handleKeyPress} // Handle Enter key press
                            className="absolute bg-transparent border border-blue-500 text-white px-4 py-2 rounded-lg"
                            style={{
                                color: fontColor,
                                fontSize: `${fontSize}px`,
                                // height: initialHeight + 'px',
                                zIndex: 999,
                                resize: 'none',
                                overflow: 'hidden'
                            }}
                        />
                    </Draggable>
                    <div
                        className="absolute bottom-0 left-0 cursor-pointer"
                        style={{ transform: 'translate(-50%, -50%)' }}
                    >
                        <IoIosExpand size={16} />
                    </div>
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
                            <option value="bold">Bold</option>
                            <option value="italic">Italic</option>
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
                {/* Apply Text button */}
                <div className="mb-6">
                    <button onClick={applyTextChanges} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">Apply Text</button>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Send</button>
            </div>
        </div>
    );
};

export default CreateConfession;
