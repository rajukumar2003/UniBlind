import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateConfession = () => {
    const [query, setQuery] = useState('mountains panorama forest');
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageType, setImageType] = useState('photo');

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
    }, []);

    // Function to handle resizing of the selected image
    const handleResize = (size) => {
        setSelectedImage(prevImage => {
            let newWidth, newHeight;

            // Determine new dimensions based on the selected size
            switch (size) {
                case 'small':
                    newWidth = prevImage.webformatWidth / 2;
                    newHeight = prevImage.webformatHeight / 2;
                    break;
                case 'medium':
                    newWidth = prevImage.webformatWidth;
                    newHeight = prevImage.webformatHeight;
                    break;
                case 'large':
                    newWidth = prevImage.webformatWidth * 2;
                    newHeight = prevImage.webformatHeight * 2;
                    break;
                default:
                    return prevImage;
            }

            // Update the selected image with the new dimensions
            return {
                ...prevImage,
                webformatWidth: newWidth,
                webformatHeight: newHeight
            };
        });
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
                    <select id="font-style" className="rounded-lg" onChange={(e)=>{setImageType(e.target.value)}}>
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
                            className="cursor-pointer hover:opacity-80"
                            onClick={() => handleImageSelect(image)}
                        />
                    ))}
                </div>
            </div>

            {/* Center section for displaying selected image */}
            {selectedImage && (
                <div className=" inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <img src={selectedImage.largeImageURL} alt={selectedImage.tags} className="max-h-full max-w-full" />
                </div>
            )}

            {/* Right section for sizes, font tools, and send button */}
            <div className="w-2/3 p-9">
                {/* Sizes section */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Sizes</h2>
                    <div className="flex items-center">
                        <button onClick={() => handleResize('small')} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-2">Small</button>
                        <button onClick={() => handleResize('medium')} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-2">Medium</button>
                        <button onClick={() => handleResize('large')} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg">Large</button>
                    </div>
                </div>
                {/* Font Tools section */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Font Tools</h2>
                    <div className="flex items-center mb-5 ">
                        <label htmlFor="font-color" className="mr-2">Font Color:</label>
                        <input type="color" id="font-color" className="rounded-lg" />
                    </div>
                    <div className="flex items-center mb-4">
                        <label htmlFor="font-style" className="mr-2">Font Style:</label>
                        <select id="font-style" className="rounded-lg">
                            <option value="normal">Normal</option>
                            <option value="bold">Bold</option>
                            <option value="3D abstract alignment">3D</option>
                            <option value="Rowani Elegant Serif Font">Rowani Elegant Serif Font</option>
                        </select>
                    </div>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Send</button>
            </div>
        </div>
    );
};

export default CreateConfession;
