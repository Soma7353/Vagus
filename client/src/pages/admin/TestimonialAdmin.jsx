import React, { useEffect, useState } from 'react';
import api from '../../api';

const TestimonialAdmin = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: '',
    college: '',
    message: '',
    videoUrl: '',
  });

  const fetchTestimonials = async () => {
    const res = await api.get('/api/testimonials');
    setTestimonials(res.data);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (form.id) {
        await api.put(`/api/testimonials/${form.id}`, form);
      } else {
        await api.post('/api/testimonials', form);
      }
      fetchTestimonials();
      resetForm();
    } catch (err) {
      console.error('Error submitting testimonial:', err);
    }
  };

  const resetForm = () => {
    setForm({ id: null, name: '', college: '', message: '', videoUrl: '' });
  };

  const handleEdit = item => {
    setForm({ ...item });
  };

  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      await api.delete(`/api/testimonials/${id}`);
      fetchTestimonials();
    }
  };

  return (
    <div className="border p-4 bg-white rounded shadow mb-8">
      <h2 className="text-xl font-bold mb-4">Manage Testimonials</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="input" />
        <input name="college" value={form.college} onChange={handleChange} placeholder="College" required className="input" />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" className="input" />
        <input name="videoUrl" value={form.videoUrl} onChange={handleChange} placeholder="YouTube Video URL" className="input" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded col-span-1 md:col-span-2">
          {form.id ? 'Update Testimonial' : 'Add Testimonial'}
        </button>
      </form>

      <div className="grid md:grid-cols-2 gap-4">
        {testimonials.map(item => (
          <div key={item.id} className="border rounded p-3 shadow text-sm">
            <iframe
              src={item.videoUrl}
              title={item.name}
              className="w-full h-48 mb-2"
              allowFullScreen
            />
            <h4 className="font-semibold">{item.name} – {item.college}</h4>
            <p className="text-gray-600">{item.message}</p>
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

export default TestimonialAdmin;
