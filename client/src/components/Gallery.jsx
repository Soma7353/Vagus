import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import api from '../api';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Ensure environment variable is set correctly
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    api.get('/api/gallery')
      .then((res) => {
        setImages(res.data);
        console.log("Gallery images:", res.data);
      })
      .catch((err) => console.error('Gallery load error:', err));
  }, []);

  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: (
      <div className="slick-arrow right-3 text-blue-600 text-2xl cursor-pointer z-20">❯</div>
    ),
    prevArrow: (
      <div className="slick-arrow left-3 text-blue-600 text-2xl cursor-pointer z-20">❮</div>
    ),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const buildImageUrl = (filePath) => {
    if (!API_BASE_URL || !filePath) return '';
    const cleanBase = API_BASE_URL.replace(/\/+$/, '');
    const cleanPath = filePath.replace(/^\/+/, '');
    return `${cleanBase}/${cleanPath}`;
  };

  return (
    <section id="gallery" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-800 uppercase tracking-wider">
          Gallery
        </h2>

        {images.length > 0 ? (
          <Slider {...settings}>
            {images.map((img) => {
              const imageUrl = buildImageUrl(img.filePath);
              console.log("Image URL:", imageUrl);
              return (
                <div key={img.id} className="p-3">
                  <div className="rounded overflow-hidden shadow-lg">
                    <img
                      src={imageUrl}
                      alt={img.title || 'Gallery Image'}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        e.target.src = '/default.jpg'; // Optional fallback
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </Slider>
        ) : (
          <p className="text-center text-gray-500">No images found.</p>
        )}
      </div>
    </section>
  );
};

export default Gallery;
