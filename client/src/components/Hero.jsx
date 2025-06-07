// src/components/Hero.jsx
import React from 'react';
import heroImage from '../assets/logoo.jpg';

const Hero = () => {
  return (
    <section className="bg-white py-12 lg:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center px-6">
        
        {/* Left Text Section */}
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-blue-900 mb-4 leading-tight">
            Bring your <span className="text-blue-600">NEET Vision</span> to Life
            <br />
            with <span className="text-indigo-500">Expert Mentorship</span>
          </h1>
          <p className="text-gray-600 mb-6">
            Empowering future doctors with structured guidance, practice, and results.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition"
          >
            Enquire Now →
          </a>
        </div>

        {/* Right Image Section */}
        <div className="lg:w-1/2 relative">
          <img
            src={heroImage}
            alt="NEET students"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
