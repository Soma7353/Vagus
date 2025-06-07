import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Optional: always scroll to top on route change
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
          <span className="text-indigo-700 font-bold text-lg">NEET ACADEMY</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link to="/">Home</Link>
          <Link to="/directors-message">Director's Message</Link>
          <Link to="/#courses">Courses</Link>
          <Link to="/#results">Results</Link>
          <Link to="/#gallery">Gallery</Link>
          <Link to="/downloads">Downloads</Link>
          <Link to="/#testimonials">Testimonials</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About Us</Link>
        </nav>

        {/* Enquire Now Button */}
        <Link
          to="/contact"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-full font-semibold text-sm transition"
        >
          Enquire Now
        </Link>
      </div>
    </header>
  );
};

export default Header;
