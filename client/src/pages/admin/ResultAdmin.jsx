import React, { useEffect, useState } from 'react';
import api from '../../api';

const ResultAdmin = () => {
  const [results, setResults] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: '',
    rank: '',
    college: '',
    year: '',
    color: '',
    photo: null,
  });

  const fetchResults = async () => {
    const res = await api.get('/api/results');
    setResults(res.data);
  };

  useEffect(() => {
    fetchResults();
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
    formData.append('name', form.name);
    formData.append('rank', form.rank);
    formData.append('college', form.college);
    formData.append('year', form.year);
    formData.append('color', form.color);
    if (form.photo) formData.append('photo', form.photo);

    try {
      if (form.id) {
        // Update
        await api.put(`/api/results/${form.id}`, formData);
      } else {
        // Create
        await api.post('/api/results', formData);
      }
      fetchResults();
      resetForm();
    } catch (err) {
      console.error('Error submitting result:', err);
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      name: '',
      rank: '',
      college: '',
      year: '',
      color: '',
      photo: null,
    });
  };

  const handleEdit = result => {
    setForm({
      id: result.id,
      name: result.name,
      rank: result.rank,
      college: result.college,
      year: result.year,
      color: result.color,
      photo: null, // Keep null to avoid replacing unless user uploads
    });
  };

  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this result?')) {
      await api.delete(`/api/results/${id}`);
      fetchResults();
    }
  };

  return (
    <div className="border p-4 bg-white rounded shadow mb-8">
      <h2 className="text-xl font-bold mb-4">Manage Results</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="input" />
        <input name="rank" value={form.rank} onChange={handleChange} placeholder="Rank" required className="input" />
        <input name="college" value={form.college} onChange={handleChange} placeholder="College" required className="input" />
        <input name="year" value={form.year} onChange={handleChange} placeholder="Year" required className="input" />
        <input name="color" value={form.color} onChange={handleChange} placeholder="Card Color" required className="input" />
        <input type="file" name="photo" accept="image/*" onChange={handleChange} className="input" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded col-span-1 md:col-span-2">
          {form.id ? 'Update Result' : 'Add Result'}
        </button>
      </form>

      <table className="w-full text-left text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Rank</th>
            <th className="p-2">College</th>
            <th className="p-2">Year</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map(r => (
            <tr key={r.id} className="border-t">
              <td className="p-2">{r.name}</td>
              <td className="p-2">{r.rank}</td>
              <td className="p-2">{r.college}</td>
              <td className="p-2">{r.year}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => handleEdit(r)} className="text-blue-600">Edit</button>
                <button onClick={() => handleDelete(r.id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultAdmin;
