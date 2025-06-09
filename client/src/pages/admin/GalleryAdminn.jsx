import React, { useEffect, useState } from 'react';
import api from '../../api'; // Your Axios instance
import { toast } from 'react-toastify';

//const API_BASE = process.env.REACT_APP_API_BASE_URL;

const GalleryAdminn = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [file, setFile] = useState(null);

  // Load categories with images on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/api/image-gallery');
        setCategories(res.data);
        if (res.data.length > 0) setSelectedCat(res.data[0].id);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  // Find selected category images
  const selectedCategory = categories.find(cat => cat.id === parseInt(selectedCat));

  const handleUpload = async () => {
    if (!file || !selectedCat) return toast.error('Select category and image.');

    const formData = new FormData();
    formData.append('categoryId', selectedCat);
    formData.append('image', file);

    try {
      await api.post('/api/image-gallery/upload', formData);
      toast.success('Image uploaded successfully');
      setFile(null);
      // Refresh categories with images after upload
      const res = await api.get('/api/image-gallery');
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Image upload failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    try {
      await api.delete(`/api/image-gallery/image/${id}`);
      toast.success('Image deleted');
      // Refresh categories with images after delete
      const res = await api.get('/api/image-gallery');
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete image');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Gallery Admin Panel</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Select Category:</label>
        <select
          value={selectedCat || ''}
          onChange={(e) => setSelectedCat(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Upload Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
        />
      </div>

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {(selectedCategory?.images || []).map(img => (
          <div key={img.id} className="relative group border p-2 rounded shadow">
            <img
              src={img.image}  // image stored as base64 data URL in DB
              alt=""
              className="w-full h-40 object-cover rounded"
            />
            <button
              onClick={() => handleDelete(img.id)}
              className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryAdminn;
