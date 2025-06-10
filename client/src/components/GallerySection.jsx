// components/GallerySection.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import heroBg from '../assets/gallery-hero.jpg';   // ✅ replace with your hero image

const GallerySection = () => {
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading]   = useState(true);

  /* ───────── Fetch data once ───────── */
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get('https://vagus-1.onrender.com/api/image-gallery');
        setCategories(res.data);
      } catch (err) {
        console.error('Gallery fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  /* ───────── Helpers ───────── */
  const allImages = categories.flatMap((cat) =>
    (cat.images || []).map((img) => ({ ...img, catName: cat.name }))
  );

  const filteredImages =
    activeTab === 'All'
      ? allImages
      : allImages.filter((img) => img.catName === activeTab);

  /* ───────── UI ───────── */
  return (
    <>
      {/* Hero Banner */}
      <div
        className="h-[350px] md:h-[420px] w-full bg-center bg-cover flex items-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="bg-black/40 w-full h-full absolute top-0 left-0" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            Explore Our Gallery
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            Our campus is more than just an appealing place to live—it’s a welcoming
            community where you’ll make lifelong friends and life-changing decisions.
          </p>
        </div>
      </div>

      {/* Tabs */}
      {/* Tabs */}
<div className="bg-white sticky top-[96px] z-40 border-b bg-grey-50">
  <div className="max-w-6xl mx-auto px-4">
    <div className="flex gap-4 overflow-x-auto no-scrollbar py-3">
      {['All', ...categories.map((c) => c.name)].map((label) => (
        <button
          key={label}
          onClick={() => setActiveTab(label)}
          className={`relative px-3 py-1.5 font-medium whitespace-nowrap transition-all duration-300
            ${
              activeTab === label
                ? 'text-indigo-600 after:scale-x-100'
                : 'text-gray-600 hover:text-indigo-500 after:scale-x-0'
            }
            after:content-[''] after:absolute after:left-0 after:bottom-0
            after:h-[2px] after:w-full after:bg-indigo-600 after:transition-transform after:origin-left
          `}
        >
          {label}
        </button>
      ))}
    </div>
  </div>
</div>


      {/* Gallery Grid */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          {loading ? (
            <p className="text-center animate-pulse">Loading images …</p>
          ) : filteredImages.length === 0 ? (
            <p className="text-center italic text-gray-500">
              No images available for {activeTab}.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredImages.map((img) => (
                <div
                  key={img.id}
                  className="overflow-hidden rounded shadow hover:shadow-lg transition"
                >
                  <img
                    src={img.image}
                    alt={img.catName}
                    loading="lazy"
                    className="w-full h-40 object-cover hover:scale-105 transform transition duration-300"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default GallerySection;
