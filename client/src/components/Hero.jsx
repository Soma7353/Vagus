import React from 'react';
import heroImg from '../assets/logo.png';
import student1 from '../assets/logo.png';
import student2 from '../assets/logo.png';
import student3 from '../assets/logo.png';
import student4 from '../assets/logo.png';
import student5 from '../assets/logo.png';

const Hero = () => {
  return (
    <section className="relative bg-blue-600 text-white h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between w-full">
        <div className="lg:w-1/2 space-y-6">
          <p className="uppercase text-sm tracking-widest">1963+ Achievers</p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-snug">
            Your Path To <span className="underline">NEET Success</span> Starts Here!
          </h1>
          <p className="text-sm max-w-md text-white/80">
            Application-based education, expert training, and top placements in leading medical colleges.
          </p>
          <div className="flex gap-4">
            <button className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded shadow hover:bg-yellow-300">
              Enroll Today
            </button>
            <button className="bg-white/10 px-4 py-2 border border-white rounded hover:bg-white/20">
              Watch Demo class
            </button>
          </div>
          <div className="flex gap-2 items-center mt-4">
            {[student1, student2, student3, student4, student5].map((img, idx) => (
              <img key={idx} src={img} alt="achiever" className="w-12 h-12 rounded-full border-2 border-white" />
            ))}
          </div>
          <div className="flex gap-8 mt-4">
            <div>
              <p className="text-2xl font-bold">1963+</p>
              <span className="text-sm text-white/70">Achievers</span>
            </div>
            <div>
              <p className="text-2xl font-bold flex items-center">
                4.9 <span className="ml-1 text-yellow-300">★★★★★</span>
              </p>
              <span className="text-sm text-white/70">Rating</span>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 mt-10 lg:mt-0">
          <img src={heroImg} alt="Topper" className="w-full max-w-md mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
