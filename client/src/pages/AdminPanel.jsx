import React from 'react';
import ResultAdmin from './admin/ResultAdmin';
import GalleryAdmin from './admin/GalleryAdmin';
import TestimonialAdmin from './admin/TestimonialAdmin';
import DownloadAdmin from './admin/DownloadAdmin';

const AdminPanel = () => {
  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <ResultAdmin />
      <GalleryAdmin />
      <TestimonialAdmin />
      <DownloadAdmin />
    </div>
  );
};

export default AdminPanel;
