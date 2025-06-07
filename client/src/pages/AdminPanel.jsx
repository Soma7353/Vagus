import React, { useState } from 'react';
import ResultAdmin from './admin/ResultAdmin';
import GalleryAdmin from './admin/GalleryAdmin';
import TestimonialAdmin from './admin/TestimonialAdmin';
import DownloadAdmin from './admin/DownloadAdmin';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('results');

  const sections = [
    { id: 'results', label: 'Results', Component: ResultAdmin },
    { id: 'gallery', label: 'Gallery', Component: GalleryAdmin },
    { id: 'testimonials', label: 'Testimonials', Component: TestimonialAdmin },
    { id: 'downloads', label: 'Downloads', Component: DownloadAdmin },
  ];

  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem('admin_logged_in');
            window.location.href = '/admin-login';
          }}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Navigation */}
      <nav className="mb-8 flex flex-wrap gap-4">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className={`px-4 py-1 rounded ${
              activeSection === id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Sections */}
      {sections.map(({ id, label, Component }) =>
        activeSection === id ? (
          <section key={id} id={id} className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">{label}</h2>
            <Component />
          </section>
        ) : null
      )}
    </div>
  );
};

export default AdminPanel;
