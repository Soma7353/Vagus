import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToHash from './components/ScrollToHash';

// Homepage Components
import HomeSlider from './components/HomeSlider';
import Hero from './components/Hero';
import Courses from './components/Courses';
import Features from './components/Features';
import Results from './components/Results';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';

// Other Pages
import GallerySection from './components/GallerySection';
import DownloadSection from './components/DownloadSection';
import DirectorsMessage from './pages/DirectorsMessage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ContactPage from './pages/ContactPage';
import AdminPanel from './pages/AdminPanel';
import AdminLogin from './pages/AdminLogin';
import About from './pages/About';
import ResultsPage from './pages/ResultsPage';

function ScrollRedirectWrapper({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to homepage if user refreshed a different route
    if (performance.navigation.type === 1 && location.pathname !== '/') {
      navigate('/');
    }
  }, [location.pathname, navigate]);

  return children;
}

function App() {
  return (
    <Router>
      <ScrollToHash />
      <ScrollRedirectWrapper>
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <main className="pt-[96px]">
                  <HomeSlider />
                  <Hero />

                  {/* Courses Section */}
                  <div id="courses">
                    <Courses />
                  </div>

                  <Features />
                  <Results />
                  <Gallery />

                  {/* Testimonials Section */}
                  <div id="testimonials">
                    <Testimonials />
                  </div>
                </main>
                <Footer />
              </>
            }
          />

          {/* Other Pages */}
          <Route path="/gallery" element={<GallerySection />} />
          <Route path="/downloads" element={<DownloadSection />} />
          <Route path="/directors-message" element={<DirectorsMessage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/about" element={<About />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </ScrollRedirectWrapper>
    </Router>
  );
}

export default App;
