import React, { useEffect, useState } from 'react';
import api from '../../api'; // Axios instance
import { toast } from 'react-toastify';

const API_BASE = process.env.REACT_APP_API_BASE_URL;

const GalleryAdminn = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState('');
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);

  // Load categories on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/api/image-gallery/categories');
        const data = res.data;

        // If no categories from backend, use defaults
        if (data.length === 0) {
          const defaultCats = [
            { id: 1, name: 'Classroom' },
            { id: 2, name: 'Office' },
            { id: 3, name: 'Students' },
            { id: 4, name: 'Interaction' },
            { id: 5, name: 'Hostel' },
            { id: 6, name: 'Dining Area' },
          ];
          setCategories(defaultCats);
          setSelectedCat(defaultCats[0].id);
        } else {
          setCategories(data);
          setSelectedCat(data[0].id);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        toast.error('Failed to load categories');
      }
    };
    fetchData();
  }, []);

  // Load images for selected category
  useEffect(() => {
    if (selectedCat) fetchImagesByCategory();
  }, [selectedCat]);

  const fetchImagesByCategory = async () => {
    try {
      const res = await api.get(`/api/image-gallery/categories/${selectedCat}/images`);
      setImages(res.data);
    } catch (err) {
      console.error('Error fetching images:', err);
      toast.error('Failed to load images');
    }
  };

  const handleUpload = async () => {
    if (!file || !selectedCat) return toast.error('Select category and image.');

    const formData = new FormData();
    formData.append('categoryId', selectedCat);
    formData.append('image', file);

    try {
      await api.post('/api/image-gallery/images', formData);
      toast.success('Image uploaded successfully');
      setFile(null);
      fetchImagesByCategory();
    } catch (err) {
      console.error('Upload failed:', err);
      toast.error('Image upload failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    try {
      await api.delete(`/api/image-gallery/images/${id}`);
      toast.success('Image deleted');
      fetchImagesByCategory();
    } catch (err) {
      console.error('Delete failed:', err);
      toast.error('Failed to delete image');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Gallery Admin Panel</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Select Category:</label>
        <select
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          {categories.map((cat) => (
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
        {images.map((img) => (
          <div key={img.id} className="relative group border p-2 rounded shadow">
            <img
              src={`${API_BASE}/api/image-gallery/images/${img.id}`}
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
