import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import api from '../api';
import { NextArrow, PrevArrow } from './BlueArrows';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await api.get('/api/testimonials');

        const data = res.data.map((t) => ({
          ...t,
          embedUrl: convertToEmbed(t.video_link),
        }));

        setTestimonials(data);
      } catch (err) {
        console.error('Failed to load testimonials:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const convertToEmbed = (url) => {
    if (!url) return '';
    if (url.includes('youtu.be')) {
      return url.replace('https://youtu.be/', 'https://www.youtube.com/embed/');
    }
    if (url.includes('watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
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

  if (loading) return <div className="text-center py-10">Loading testimonials...</div>;

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No testimonials found.
      </div>
    );
  }

  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">Student Testimonials</h2>
        <Slider {...settings}>
          {testimonials.map((t) => (
            <div key={t.id} className="p-2">
              <div className="bg-white rounded shadow max-w-xs w-full mx-auto">
                <div className="aspect-video w-full">
                  <iframe
                    src={t.embedUrl}
                    title={t.name}
                    className="w-full h-60 rounded-t"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-bold text-blue-700 text-sm">{t.name}</h4>
                  {t.college && <p className="text-gray-500 text-xs italic">{t.college}</p>}
                  {t.message && <p className="text-gray-700 text-sm mt-1">{t.message}</p>}
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
