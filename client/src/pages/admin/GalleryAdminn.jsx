import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE_URL || '';

const GalleryAdminn = () => {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchImages();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/galleryy/categories`);
      setCategories(res.data);
      setSelectedCategory(res.data[0]?.id || '');
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/galleryy/photo`);
      setImages(res.data);
    } catch (err) {
      console.error('Error fetching images:', err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !selectedCategory) return alert('Select a file and category');

    const formData = new FormData();
    formData.append('photo', file); // MUST MATCH backend field
    formData.append('category_id', selectedCategory);

    try {
      await axios.post(`${API_BASE}/api/galleryy/upload`, formData);
      setFile(null);
      fetchImages();
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    try {
      await axios.delete(`${API_BASE}/api/galleryy/images/${id}`);
      fetchImages();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Gallery Image Manager</h2>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="mb-8 bg-white shadow p-4 rounded">
        <div className="mb-3">
          <label className="block font-semibold mb-1">Select Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="block font-semibold mb-1">Select Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            required
            className="block"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload Image
        </button>
      </form>

      {/* Image List */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative border rounded overflow-hidden shadow">
            <img
              src={`${API_BASE}/api/galleryy/images/${img.id}`}
              alt={`Gallery ${img.id}`}
              className="w-full h-40 object-cover"
            />
            <button
              onClick={() => handleDelete(img.id)}
              className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
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
