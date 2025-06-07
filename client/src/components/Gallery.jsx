// src/components/Gallery.jsx
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import api from '../api';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    api.get('/api/gallery')
      .then((res) => setImages(res.data))
      .catch((err) => console.error('Gallery load error:', err));
  }, []);

  // Group images into chunks of 6
  const chunkedImages = [];
  for (let i = 0; i < images.length; i += 6) {
    chunkedImages.push(images.slice(i, i + 6));
  }

  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section id="gallery" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-blue-800 text-center mb-10">Gallery</h2>

        <Slider {...settings}>
          {chunkedImages.map((group, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
              {group.map((img) => (
                <div key={img.id} className="overflow-hidden rounded-lg shadow hover:shadow-md transition">
                  <img
                    src={`http://localhost:5000${img.filePath}`}
                    alt={img.title}
                    className="w-full h-52 object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Gallery;
