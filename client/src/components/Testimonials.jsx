import React, { useEffect, useState, useCallback } from 'react';
import Slider from 'react-slick';
import api from '../api';
import { NextArrow, PrevArrow } from './BlueArrows';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const convertToEmbed = useCallback((url) => {
    if (!url || typeof url !== 'string') return '';
    const trimmed = url.trim();
    try {
      const u = new URL(trimmed);
      if (u.hostname === 'youtu.be') {
        return `https://www.youtube.com/embed${u.pathname}`;
      }
      if (u.pathname.startsWith('/shorts/')) {
        return `https://www.youtube.com/embed${u.pathname.replace('/shorts', '')}`;
      }
      const id = u.searchParams.get('v');
      return id ? `https://www.youtube.com/embed/${id}` : trimmed;
    } catch {
      return '';
    }
  }, []);

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
  }, [convertToEmbed]);

  const settings = {
    dots: true,
    arrows: true,
    infinite: testimonials.length > 2,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1 } },
    ],
  };

  if (loading) return <div className="text-center py-10">Loading testimonials...</div>;
  if (testimonials.length === 0) return <div className="text-center py-10 text-gray-500">No testimonials found.</div>;

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">
          Student Testimonials
        </h2>

        <Slider {...settings}>
  {testimonials.map((t) => (
    <div key={t.id} className="px-2">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow h-[380px] overflow-hidden">
        <div className="md:w-1/2 h-full">
          {t.embedUrl ? (
            <iframe
              src={t.embedUrl}
              title={`${t.name} testimonial`}
              className="w-full h-full object-cover"
              frameBorder="0"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">
              No video
            </div>
          )}
        </div>

        <div className="md:w-1/2 p-6 flex flex-col justify-between text-left bg-white">
          <div>
            {t.message && (
              <p className="text-lg text-gray-700 font-medium leading-relaxed mb-4">
                “{t.message}”
              </p>
            )}
          </div>
          <div>
            <p className="text-blue-700 font-semibold text-md">{t.name}</p>
            {t.college && (
              <p className="text-sm text-gray-500">{t.college}</p>
            )}
          </div>
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
