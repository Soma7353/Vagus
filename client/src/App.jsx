// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Hero from './components/Hero';
import Results from './components/Results';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Courses from './components/Courses';
import Features from './components/Features';
import DownloadSection from './components/DownloadSection';

import DirectorsMessage from './pages/DirectorsMessage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ContactPage from './pages/ContactPage';
import AdminPanel from './pages/AdminPanel';
import AdminLogin from './pages/AdminLogin';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Hero />
              <Courses />
              <Features />
              <Results />
              <Gallery />
              <Testimonials />
            </Layout>
          }
        />
        <Route path="/directors-message" element={<Layout><DirectorsMessage /></Layout>} />
        <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
        <Route path="/downloads" element={<Layout><DownloadSection /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
