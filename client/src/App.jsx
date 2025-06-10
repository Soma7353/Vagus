import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import Results from './components/Results';
import Gallery from './components/Gallery'; // OLD Gallery on homepage
import GallerySection from './components/GallerySection'; // ✅ NEW Full Gallery Page
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Courses from './components/Courses';
import Features from './components/Features';
import DownloadSection from './components/DownloadSection';
import ScrollToHash from './components/ScrollToHash';
import HomeSlider from './components/HomeSlider'; 
import ResultsPage from './pages/ResultsPage';

import DirectorsMessage from './pages/DirectorsMessage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ContactPage from './pages/ContactPage';
import AdminPanel from './pages/AdminPanel';
import AdminLogin from './pages/AdminLogin';
import About from './pages/About';


function App() {
  return (
    <Router>
      <ScrollToHash />
      
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
             <main className="pt-[96px]">
  <HomeSlider />
  <Hero />
  <div id="courses">
    <Courses />
  </div>
  <Features />
  <Results />
  <Gallery />
  <div id="testimonials">
    <Testimonials />
  </div>
</main>

              <Footer />
            </>
          }
        />
        <Route path="/gallery" element={<GallerySection />} /> {/* ✅ new full gallery route */}
        <Route path="/directors-message" element={<DirectorsMessage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/downloads" element={<DownloadSection />} />
        <Route path="/about" element={<About />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
