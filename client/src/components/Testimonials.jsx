import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import api from '../api';
import { NextArrow, PrevArrow } from './BlueArrows';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Testimonials = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    api.get('/api/testimonials').then((res) => {
      const data = res.data.map((t) => ({
        ...t,
        videoUrl: convertToEmbed(t.videoUrl),
      }));
      setVideos(data);
    });
  }, []);

  const convertToEmbed = (url) => {
    if (url.includes('youtu.be')) return url.replace('youtu.be/', 'www.youtube.com/embed/');
    if (url.includes('watch?v=')) return url.replace('watch?v=', 'embed/');
    return url;
  };

  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 relative">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">Student Testimonials</h2>
        <Slider {...settings}>
          {videos.map((t) => (
            <div key={t.id} className="p-2">
              <div className="bg-white rounded shadow max-w-xs w-full mx-auto">
                <div className="aspect-[16/9] w-full">
                  <iframe
                    src={t.videoUrl}
                    title={t.name}
                    className="w-full h-[250px] rounded-t"
                    allowFullScreen
                  />
                </div>
                <div className="p-3 text-left">
                  <h4 className="font-bold text-blue-700 text-sm">{t.name}</h4>
                  <p className="text-gray-500 text-xs italic">{t.college}</p>
                  <p className="text-gray-700 text-sm mt-1">{t.message}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
