import React from 'react';
import ResultAdmin from './admin/ResultAdmin';
import GalleryAdmin from './admin/GalleryAdmin';
import TestimonialAdmin from './admin/TestimonialAdmin';
import DownloadAdmin from './admin/DownloadAdmin';

const AdminPanel = () => {
  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Results</h2>
        <ResultAdmin />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
        <GalleryAdmin />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
        <TestimonialAdmin />
      </section>

<nav className="mb-8 flex flex-wrap gap-4">
  {['Results', 'Gallery', 'Testimonials', 'Downloads'].map((label) => (
    <a href={`#${label.toLowerCase()}`} className="text-blue-600 underline" key={label}>
      {label}
    </a>
  ))}
</nav>


      <button
  onClick={() => {
    localStorage.removeItem('admin_logged_in');
    window.location.href = '/admin-login';
  }}
  className="bg-red-600 text-white px-4 py-2 rounded float-right mb-4"
>
  Logout
</button>


      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Downloads</h2>
        <DownloadAdmin />
      </section>
    </div>

    
  );
};

export default AdminPanel;
