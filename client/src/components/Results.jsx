import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import api from '../api';
import { NextArrow, PrevArrow } from './BlueArrows';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Results = () => {
  const [results, setResults] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await api.get('/api/results');
        const data = res.data;
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

  if (!API_BASE_URL) {
    return (
      <div className="text-center py-10 text-red-600">
        ⚠️ Environment variable <code>REACT_APP_API_BASE_URL</code> is not set.
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-10">Loading results...</div>;
  }

  if (filtered.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No achievers found for NEET {selectedYear}.
      </div>
    );
  }

  return (
    <section id="results" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">Our Achievers</h2>

        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-1 rounded-full border transition-colors ${
                selectedYear === year
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-200 text-gray-800 border-gray-300'
              }`}
            >
              NEET {year}
            </button>
          ))}
        </div>

        <Slider {...settings}>
          {filtered.map((r) => (
            <div key={r.id} className="p-2">
              <div className="border border-blue-600 rounded shadow text-center overflow-hidden">
                <img
                  src={`${API_BASE_URL}${r.photo}`}
                  alt={r.name}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/fallback.png';
                  }}
                />
                <div className="bg-blue-600 text-white py-3">
                  <h4 className="text-lg font-bold">{r.name}</h4>
                  <p className="text-sm">{r.college}</p>
                  <p className="text-sm">Rank: {r.rank}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Results;
