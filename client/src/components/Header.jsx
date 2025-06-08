import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false); // Close menu on route change
  }, [location.pathname]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50 h-[96px]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src={logo} alt="VAGUS Logo" className="h-16 object-contain" />
        </div>

        {/* Desktop Navigation */}
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

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        <Link
          to="/contact"
          className="hidden md:inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-full font-semibold text-sm transition"
        >
          Enquire Now
        </Link>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-6 pb-4 pt-2 space-y-4 text-sm font-medium shadow">
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/directors-message" onClick={toggleMenu}>Director's Message</Link>
          <Link to="/#courses" onClick={toggleMenu}>Courses</Link>
          <Link to="/#results" onClick={toggleMenu}>Results</Link>
          <Link to="/#gallery" onClick={toggleMenu}>Gallery</Link>
          <Link to="/downloads" onClick={toggleMenu}>Downloads</Link>
          <Link to="/#testimonials" onClick={toggleMenu}>Testimonials</Link>
          <Link to="/contact" onClick={toggleMenu}>Contact</Link>
          <Link to="/about" onClick={toggleMenu}>About Us</Link>
          <Link
            to="/contact"
            onClick={toggleMenu}
            className="inline-block w-full text-center bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-full font-semibold transition"
          >
            Enquire Now
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
