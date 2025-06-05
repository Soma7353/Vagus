// src/components/admin/ResultAdmin.jsx
import React, { useEffect, useState } from 'react';
import api from '../../api';                // axios instance with baseURL

const ResultAdmin = () => {
  const [results, setResults] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: '',
    rank: '',
    college: '',
    year: '',
    image: null,          // 👈 renamed from file → image
  });

  /* ─────────────────────────────────── LOAD DATA ─────────────────────────────────── */
  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await api.get('/api/results');
      setResults(res.data || []);
    } catch (err) {
      console.error('Error fetching results:', err);
      alert('Failed to load results.');
    }
  };

  /* ─────────────────────────────────── FORM HANDLERS ─────────────────────────────────── */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('rank', form.rank);
    fd.append('college', form.college);
    fd.append('year', form.year);
    if (form.image) fd.append('image', form.image);   // 👈 use image

    try {
      if (form.id) {
        await api.put(`/api/results/${form.id}`, fd);
      } else {
        await api.post('/api/results', fd);
      }
      fetchResults();
      resetForm();
    } catch (err) {
      console.error('Error saving result:', err);
      alert('Failed to save result.');
    }
  };

  const resetForm = () => {
    setForm({ id: null, name: '', rank: '', college: '', year: '', image: null });
  };

  const handleEdit = (item) => {
    setForm({
      id: item.id,
      name: item.name,
      rank: item.rank,
      college: item.college,
      year: item.year,
      image: null, // new file must be chosen
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this result?')) {
      try {
        await api.delete(`/api/results/${id}`);
        fetchResults();
      } catch (err) {
        console.error('Error deleting result:', err);
        alert('Failed to delete result.');
      }
    }
  };

  /* ─────────────────────────────────── RENDER ─────────────────────────────────── */
  return (
    <div className="border p-6 bg-white rounded shadow mb-10">
      <h2 className="text-xl font-semibold mb-4 text-blue-800">Manage Results</h2>

      {/* ── FORM ── */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Student Name"
          required
          className="border px-4 py-2 rounded"
        />
        <input
          name="rank"
          value={form.rank}
          onChange={handleChange}
          placeholder="Rank"
          required
          className="border px-4 py-2 rounded"
        />
        <input
          name="college"
          value={form.college}
          onChange={handleChange}
          placeholder="College"
          required
          className="border px-4 py-2 rounded"
        />
        <input
          name="year"
          value={form.year}
          onChange={handleChange}
          placeholder="Year"
          required
          className="border px-4 py-2 rounded"
        />
        <input
          type="file"
          name="image"                 // 👈 must be image
          accept="image/*"
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded col-span-1 md:col-span-2"
        >
          {form.id ? 'Update Result' : 'Add Result'}
        </button>
      </form>

      {/* ── LIST ── */}
      <ul className="space-y-3">
        {results.map((r) => (
          <li key={r.id} className="flex justify-between items-center bg-gray-100 p-3 rounded">
            <div>
              <p className="font-medium">{r.name} — Rank {r.rank}</p>
              <p className="text-sm text-gray-600">
                {r.college} ({r.year})
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href={`/api/results/${r.id}/image`} // 👈 matches routes
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline"
              >
                View Photo
              </a>
              <button onClick={() => handleEdit(r)} className="text-blue-600 hover:underline">
                Edit
              </button>
              <button onClick={() => handleDelete(r.id)} className="text-red-600 hover:underline">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultAdmin;
