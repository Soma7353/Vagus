import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import api from '../api';
import { NextArrow, PrevArrow } from './BlueArrows';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Results = () => {
  const [results, setResults] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    try {
      const res = await api.get('/api/results');
      const data = res.data.map((r) => ({
        ...r,
        photo: `/api/results/${r.id}/image`,
      }));
      setResults(data);
      const uniqueYears = [...new Set(data.map((r) => r.year))].sort((a, b) => b - a);
      setYears(uniqueYears);
      setSelectedYear(uniqueYears[0] || null);
    } catch (err) {
      console.error('Failed to fetch results:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const filtered = results.filter((r) => r.year === selectedYear);

  const settings = {
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
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  if (loading) return <div className="text-center py-10">Loading results...</div>;

  return (
    <section id="results" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">Our Achievers</h2>

        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-1 rounded-full border ${
                selectedYear === year ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              NEET {year}
            </button>
          ))}
        </div>

        <Slider {...settings}>
          {filtered.map((r) => (
            <div key={r.id} className="p-2">
              <div className="rounded-xl text-center text-black p-4 shadow-lg bg-gray-100">
                <div className="relative w-40 h-40 mx-auto mb-4">
                  <img
                    src={r.photo}
                    alt={r.name}
                    className="w-40 h-40 object-cover rounded-full border-4 border-yellow-400"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/fallback.png';
                    }}
                  />
                </div>
                <h4 className="text-lg font-bold uppercase">{r.name}</h4>
                <p className="text-base font-bold bg-yellow-400 text-black inline-block px-3 py-1 rounded mt-2">
                  {r.college}
                </p>
                <p className="text-sm text-gray-600">Rank: {r.rank}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Results;
