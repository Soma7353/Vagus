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

  useEffect(() => {
    api.get('/api/results').then((res) => {
      const data = res.data;
      setResults(data);
      const uniqueYears = [...new Set(data.map((r) => r.year))].sort((a, b) => b - a);
      setYears(uniqueYears);
      setSelectedYear(uniqueYears[0] || null);
    });
  }, []);

  const filtered = results.filter((r) => r.year === selectedYear);

  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section id="results" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-800 uppercase tracking-widest">
          Our NEET/JEE Achievers
        </h2>

        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-1 rounded-full border text-sm font-medium ${
                selectedYear === year ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              NEET {year}
            </button>
          ))}
        </div>

        <Slider {...settings}>
          {filtered.map((r) => (
            <div key={r.id} className="p-3">
              <div className="bg-white border rounded-xl shadow-lg overflow-hidden text-center">
                <div className="relative">
                  <img
                    src={`${API_BASE_URL}${r.photo}`}
                    alt={r.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold shadow">
                    {r.rank}/720
                  </div>
                </div>
                <div className="bg-blue-600 text-white py-3 space-y-1">
                  <h4 className="text-md font-bold uppercase">{r.name}</h4>
                  <div className="bg-yellow-400 text-black text-sm font-semibold px-2 py-1 rounded inline-block">
                    {r.college}
                  </div>
                  <p className="text-xs text-gray-200">{r.city}</p>
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
