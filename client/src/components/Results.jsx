import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import api from '../api';                // axios with baseURL
import { NextArrow, PrevArrow } from './BlueArrows';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Results = () => {
  const [items, setItems]       = useState([]);
  const [years, setYears]       = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading]   = useState(true);

  /* ─── Fetch once ─── */
  useEffect(() => {
    (async () => {
      try {
        const res  = await api.get('/api/results');
        const data = res.data.map(r => ({
          ...r,
          photoUrl: `/api/results/${r.id}/image`,   // endpoint for <img>
        }));
        setItems(data);
        const ys = [...new Set(data.map(r => r.year))].sort((a, b) => b - a);
        setYears(ys);
        setSelected(ys[0] || null);
      } catch (err) {
        console.error('Fetch results failed:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const show = items.filter(i => i.year === selected);

  const slick = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768,  settings: { slidesToShow: 1 } },
    ],
  };

  if (loading) return <p className="text-center py-10">Loading results…</p>;

  return (
    <section id="results" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">Our Achievers</h2>

        {/* Year filter */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {years.map(y => (
            <button
              key={y}
              onClick={() => setSelected(y)}
              className={`px-4 py-1 rounded-full border ${
                selected === y ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              NEET {y}
            </button>
          ))}
        </div>

        {/* Slider */}
        <Slider {...slick}>
          {show.map(r => (
            <div key={r.id} className="p-2">
              <div className="rounded-xl text-center shadow-lg bg-gray-100 p-4">
                {/* Photo */}
                <img
                  src={r.photoUrl}
                  alt={r.name}
                  className="w-40 h-40 object-cover mx-auto rounded-full border-4 border-yellow-400 mb-3"
                  onError={e => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/fallback.png';
                  }}
                />
                {/* Info */}
                <h4 className="text-lg font-bold uppercase">{r.name}</h4>
                <p className="text-sm font-semibold text-gray-600">Rank {r.rank}</p>
                <p className="inline-block bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded mt-2">
                  {r.college}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Results;
