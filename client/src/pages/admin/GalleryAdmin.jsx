import React, { useEffect, useState } from 'react';
import api from '../../api';

const GalleryAdmin = () => {
  const [gallery, setGallery] = useState([]);
  const [form, setForm] = useState({ id: null, title: '', image: null });

  const fetchGallery = async () => {
    try {
      const res = await api.get('/api/gallery');
      setGallery(res.data);
    } catch (err) {
      console.error('Failed to fetch gallery:', err);
      alert('Failed to load gallery');
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    if (form.image) formData.append('image', form.image);

    try {
      if (form.id) {
        await api.put(`/api/gallery/${form.id}`, formData);
      } else {
        await api.post('/api/gallery', formData);
      }
      fetchGallery();
      resetForm();
    } catch (err) {
      console.error('Error submitting gallery:', err);
      alert('Failed to submit gallery item');
    }
  };

  const resetForm = () => setForm({ id: null, title: '', image: null });

  const handleEdit = item => {
    setForm({ id: item.id, title: item.title, image: null });
  };

  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await api.delete(`/api/gallery/${id}`);
        fetchGallery();
      } catch (err) {
        console.error('Error deleting gallery:', err);
        alert('Failed to delete gallery item');
      }
    }
  };

  return (
    <div className="border p-4 bg-white rounded shadow mb-8">
      <h2 className="text-xl font-bold mb-4">Manage Gallery</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Image Title"
          required
          className="input"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="input"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded col-span-1 md:col-span-2">
          {form.id ? 'Update Image' : 'Add Image'}
        </button>
      </form>

      <ul className="space-y-2">
        {gallery.map(item => (
          <li key={item.id} className="flex justify-between items-center bg-gray-100 p-3 rounded">
            <span>{item.title}</span>
            <div className="flex gap-3">
              <button onClick={() => handleEdit(item)} className="text-blue-600">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GalleryAdmin;
