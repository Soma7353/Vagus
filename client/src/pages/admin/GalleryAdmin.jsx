import React, { useEffect, useState } from 'react';
import api from '../../api';

const GalleryAdmin = () => {
  const [gallery, setGallery] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: '',
    description: '',
    image: null,
  });

  const fetchGallery = async () => {
    const res = await api.get('/api/gallery');
    setGallery(res.data);
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
    formData.append('description', form.description);
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
      console.error('Error submitting gallery image:', err);
    }
  };

  const resetForm = () => {
    setForm({ id: null, title: '', description: '', image: null });
  };

  const handleEdit = img => {
    setForm({ id: img.id, title: img.title, description: img.description, image: null });
  };

  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      await api.delete(`/api/gallery/${id}`);
      fetchGallery();
    }
  };

  return (
    <div className="border p-4 bg-white rounded shadow mb-8">
      <h2 className="text-xl font-bold mb-4">Manage Gallery</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required className="input" />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="input" />
        <input type="file" name="image" accept="image/*" onChange={handleChange} className="input" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded col-span-1 md:col-span-2">
          {form.id ? 'Update Image' : 'Add Image'}
        </button>
      </form>

      <div className="grid md:grid-cols-3 gap-4">
        {gallery.map(item => (
          <div key={item.id} className="border rounded p-3 shadow text-sm">
            <img src={`http://localhost:5000${item.imagePath}`} alt={item.title} className="w-full h-40 object-cover rounded mb-2" />
            <h4 className="font-semibold">{item.title}</h4>
            <p className="text-gray-600">{item.description}</p>
            <div className="flex gap-3 mt-2">
              <button onClick={() => handleEdit(item)} className="text-blue-600">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryAdmin;
