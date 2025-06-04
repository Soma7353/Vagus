import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import api from '../api';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGallery = async () => {
    try {
      const res = await api.get('/api/gallery');
      const processed = res.data.map((img) => ({
        id: img.id,
        title: img.title || '',
        base64Image: `data:image/jpeg;base64,${img.image}`,
      }));
      setImages(processed);
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
    nextArrow: <div className="slick-arrow right-2 text-blue-600 text-2xl cursor-pointer z-10">❯</div>,
    prevArrow: <div className="slick-arrow left-2 text-blue-600 text-2xl cursor-pointer z-10">❮</div>,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
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
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">Gallery</h2>
        <Slider {...settings}>
          {images.map((img) => (
            <div key={img.id} className="p-2">
              <div className="overflow-hidden rounded shadow">
                <img
                  src={img.base64Image}
                  alt={img.title || 'Gallery Image'}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/fallback.png';
                  }}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Gallery;
