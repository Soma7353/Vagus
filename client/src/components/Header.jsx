import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: "Director's Message", path: '/directors-message' },
    { name: 'Courses', path: '/', scrollTo: 'courses' },
    { name: 'Results', path: '/results' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Downloads', path: '/downloads' },
    { name: 'Testimonials', path: '/', scrollTo: 'testimonials' },
    { name: 'Contact', path: '/contact' },
    { name: 'About Us', path: '/about' },
  ];

  const handleNavClick = (link) => {
    setMenuOpen(false);
    if (link.scrollTo) {
      navigate(`/#${link.scrollTo}`);
    } else {
      navigate(link.path);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50 h-[96px]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <img src={logo} alt="VAGUS Logo" className="h-16 object-contain" />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link)}
              className="hover:text-indigo-600 transition"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Enquire Now Button (Desktop) */}
        <Link
          to="/contact"
          className="hidden md:inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-full font-semibold text-sm transition"
        >
          Enquire Now
        </Link>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-6 pb-4 pt-2 text-sm font-medium shadow">
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.name} className="border-b pb-2">
                <button
                  onClick={() => handleNavClick(link)}
                  className="w-full text-left"
                >
                  {link.name}
                </button>
              </li>
            ))}
            <li className="pt-4">
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-full font-semibold transition"
              >
                Enquire Now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
