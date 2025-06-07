import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { NextArrow, PrevArrow } from './BlueArrows';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

const HomeSlider = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/slider`);
        const data = await res.json();

        const formatted = data.map((img) => ({
          ...img,
          url: `${API_BASE.replace(/\/$/, '')}/api/slider/${img.id}/photo`,
        }));

        setImages(formatted);
      } catch (error) {
        console.error('Failed to load slider images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliderImages();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="pt-20">
      {loading ? (
        <p className="text-center py-8 text-gray-500">Loading slider…</p>
      ) : (
        <Slider {...settings}>
          {images.map((img) => (
            <div key={img.id} className="px-2">
              <img
                src={img.url}
                alt={`Slide ${img.id}`}
                className="w-full h-[500px] object-cover rounded-xl shadow-md"
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default HomeSlider;
