import React, { useState } from 'react';
import ResultAdmin from './admin/ResultAdmin';
import GalleryAdmin from './admin/GalleryAdmin';
import TestimonialAdmin from './admin/TestimonialAdmin';
import DownloadAdmin from './admin/DownloadAdmin';
import Popup from './admin/Popup';
import SliderAdmin from './admin/SliderAdmin';

const TABS = [
  { id: 'slider', label: 'Slider', component: <SliderAdmin /> },
  { id: 'results', label: 'Results', component: <ResultAdmin /> },
  { id: 'gallery', label: 'Gallery', component: <GalleryAdmin /> },
  { id: 'testimonials', label: 'Testimonials', component: <TestimonialAdmin /> },
  { id: 'downloads', label: 'Downloads', component: <DownloadAdmin /> },
  { id: 'settings', label: 'Settings' },
];

const AdminPanel = () => {
  const [popupEnabled, setPopupEnabled] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('slider');

  const handleTogglePopup = () => {
    if (popupEnabled) setIsPopupOpen(true);
  };

  const renderTabContent = () => {
    if (activeTab === 'settings') {
      return (
        <div className="p-4 bg-white shadow rounded">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
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
              className={`ml-4 px-4 py-2 rounded text-white transition ${
                popupEnabled ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Show Popup
            </button>
          </div>
        </div>
      );
    }

    const tab = TABS.find((t) => t.id === activeTab);
    return tab?.component || null;
  };

  return (
    <div className="pt-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex flex-wrap mb-6 gap-2 justify-center">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mb-12">{renderTabContent()}</div>

      {/* Popup Component */}
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <h2 className="text-xl font-semibold mb-2">Admin Alert</h2>
        <p className="text-gray-700">This is your custom popup message.</p>
      </Popup>

      {/* Logout Button */}
      <div className="flex justify-end mt-8">
        <button
          onClick={() => {
            localStorage.removeItem('admin_logged_in');
            window.location.href = '/admin-login';
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
