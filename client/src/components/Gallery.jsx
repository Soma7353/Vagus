import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import api from '../api'; // axios instance
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const API_BASE = process.env.REACT_APP_API_BASE_URL || '';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGallery = async () => {
    try {
      const res = await api.get('/api/gallery');
      setImages(res.data || []);
    } catch (err) {
      console.error('Gallery load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: (
      <div className="slick-arrow right-2 text-blue-600 text-2xl cursor-pointer z-10">❯</div>
    ),
    prevArrow: (
      <div className="slick-arrow left-2 text-blue-600 text-2xl cursor-pointer z-10">❮</div>
    ),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  if (loading) return <div className="text-center py-10">Loading gallery...</div>;

  if (images.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No images found in the gallery.
      </div>
    );
  }

  return (
    <section id="gallery" className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">Gallery</h2>
        <Slider {...settings}>
          {images.map((img) => (
            <div key={img.id} className="p-2">
              <div className="relative overflow-hidden rounded shadow hover:shadow-lg transition">
                <img
                  src={`${API_BASE}/api/gallery/image/${img.id}`}
                  alt={img.title || 'Gallery Image'}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/fallback.png';
                  }}
                />
                {img.title && (
                  <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-sm px-2 py-1">
                    {img.title}
                  </div>
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Gallery;
