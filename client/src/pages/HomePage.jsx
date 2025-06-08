import React from 'react';
import Slider from '../components/Slider';
import Hero from '../components/Hero';
import Courses from '../components/Courses';
import Features from '../components/Features';
import Results from '../components/Results';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
// import DownloadSection from '../components/DownloadSection'; // Uncomment if needed
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <main className="pt-24">
        <Slider />
        <Hero />
        <Courses />
        <Features />
        <Results />
        <Gallery />
        <Testimonials />
        {/* <DownloadSection /> */}
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
