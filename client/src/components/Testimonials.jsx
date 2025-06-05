import React, { useEffect, useState, useCallback } from 'react';
import Slider from 'react-slick';
import api from '../api';
import { NextArrow, PrevArrow } from './BlueArrows';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------- 1. Convert any YouTube URL to /embed/ form ---------- */
  const convertToEmbed = useCallback((url = '') => {
    if (!url.trim()) return '';

    try {
      const u = new URL(url.trim());

      /* youtu.be/ID  →  youtube.com/embed/ID */
      if (u.hostname === 'youtu.be') {
        return `https://www.youtube.com/embed${u.pathname}`;
      }

      /* youtube.com/shorts/ID */
      if (u.pathname.startsWith('/shorts/')) {
        return `https://www.youtube.com/embed${u.pathname.replace('/shorts', '')}`;
      }

      /* youtube.com/watch?v=ID */
      const id = u.searchParams.get('v');
      if (id) {
        return `https://www.youtube.com/embed/${id}`;
      }

      /* already an /embed/ URL or something else => return as-is */
      return url;
    } catch (err) {
      console.warn('Bad video_link:', url);
      return '';
    }
  }, []);

  /* ---------- 2. Fetch testimonials ---------- */
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

  /* ---------- 3. Slick-slider settings ---------- */
  const slidesVisible = Math.min(3, testimonials.length || 1);
  const settings = {
    dots: true,
    arrows: true,
    infinite: testimonials.length > slidesVisible,
    speed: 500,
    slidesToShow: slidesVisible,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: Math.min(2, slidesVisible) } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  /* ---------- 4. UI ---------- */
  if (loading) {
    return <div className="text-center py-10">Loading testimonials...</div>;
  }

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
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">
          Student Testimonials
        </h2>

        <Slider {...settings}>
          {testimonials.map((t) => (
            <div key={t.id} className="px-2">
              <div className="bg-white rounded-lg shadow flex flex-col h-full">
                {t.embedUrl ? (
                  <div className="aspect-video">
                    <iframe
                      src={t.embedUrl}
                      title={`${t.name} testimonial`}
                      className="w-full h-full rounded-t-lg"
                      frameBorder="0"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="aspect-video flex items-center justify-center rounded-t-lg bg-gray-100">
                    <span className="text-gray-400 text-sm">No video</span>
                  </div>
                )}

                <div className="p-3 grow">
                  <h4 className="font-bold text-blue-700 text-sm">{t.name}</h4>
                  {t.college && (
                    <p className="text-gray-500 text-xs italic">{t.college}</p>
                  )}
                  {t.message && (
                    <p className="text-gray-700 text-sm mt-1">{t.message}</p>
                  )}
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
