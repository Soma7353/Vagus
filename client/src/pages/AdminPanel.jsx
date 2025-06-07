import React, { useState } from 'react';
import ResultAdmin from './admin/ResultAdmin';
import GalleryAdmin from './admin/GalleryAdmin';
import TestimonialAdmin from './admin/TestimonialAdmin';
import DownloadAdmin from './admin/DownloadAdmin';
import Popup from './admin/Popup'; // Adjust path based on actual location

const AdminPanel = () => {
  const [popupEnabled, setPopupEnabled] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleTogglePopup = () => {
    if (popupEnabled) {
      setIsPopupOpen(true);
    }
  };

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Popup Toggle Section */}
      <div className="bg-gray-100 p-4 rounded mb-6 flex justify-between items-center">
        <div>
          <label className="font-medium mr-2">Enable Popup:</label>
          <input
            type="checkbox"
            checked={popupEnabled}
            onChange={() => setPopupEnabled(!popupEnabled)}
            className="w-5 h-5"
          />
        </div>
        <button
          onClick={handleTogglePopup}
          disabled={!popupEnabled}
          className={`ml-4 px-4 py-2 rounded text-white ${
            popupEnabled ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Show Popup
        </button>
      </div>

      {/* Render Popup */}
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <h2 className="text-xl font-semibold mb-2">Admin Alert</h2>
        <p className="text-gray-700">This is your custom popup message.</p>
      </Popup>

      {/* Other Admin Sections */}
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

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Downloads</h2>
        <DownloadAdmin />
      </section>

      <button
        onClick={() => {
          localStorage.removeItem('admin_logged_in');
          window.location.href = '/admin-login';
        }}
        className="bg-red-600 text-white px-4 py-2 rounded float-right mb-4"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminPanel;
