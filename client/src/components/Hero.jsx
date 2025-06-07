import React from 'react';
import heroImage from '../assets/logoo.jpg'; // Replace with your actual image

const Hero = () => {
  return (
    <section className="min-h-[90vh] flex items-center pt-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Left: Text Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            Bring your <span className="text-indigo-600">NEET Vision</span> to Life<br />
            with <span className="text-indigo-600">Expert Mentorship</span>
          </h1>
          <p className="text-lg text-gray-600">
            Empowering future doctors with structured guidance, practice, and results.
          </p>
          <a
            href="/contact"
            className="inline-block bg-indigo-600 text-white text-lg font-medium px-6 py-3 rounded-full shadow hover:bg-indigo-700 transition"
          >
            Enquire Now →
          </a>
        </div>

        {/* Right: Image */}
        <div className="flex justify-center">
          <img
            src={heroImage}
            alt="Medical students"
            className="w-full max-w-md rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
