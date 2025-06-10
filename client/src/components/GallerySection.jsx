import React, { useState, useEffect } from "react";
import axios from "axios";

const categories = [
  "All",
  "Our Office",
  "Classroom",
  "Student Interactions",
  "Hostel",
  "Dining Area",
];

const GallerySection = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get("/api/image-gallery");
        setGalleryItems(response.data);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    };

    fetchGallery();
  }, []);

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="bg-white py-10 px-4 md:px-16">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-2">Explore Our Gallery</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our campus is more than just an appealing place to live—it’s a
          welcoming community where you’ll make lifelong friends and
          life-changing decisions.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            className={`text-lg font-semibold transition-all border-b-4 pb-1 ${
              selectedCategory === category
                ? "text-red-600 border-red-600"
                : "text-black border-transparent hover:text-red-600 hover:border-red-600"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item._id} className="overflow-hidden rounded-lg shadow-md">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GallerySection;
