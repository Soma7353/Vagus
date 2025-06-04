import React, { useEffect, useState } from 'react';
import api from '../../api';

const ResultAdmin = () => {
  const [results, setResults] = useState([]);
  const [form, setForm] = useState({ id: null, title: '', file: null });

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', form.title);
    if (form.file) formData.append('file', form.file);

    try {
      if (form.id) {
        await api.put(`/api/results/${form.id}`, formData);
      } else {
        await api.post('/api/results', formData);
      }
      fetchResults();
      resetForm();
    } catch (err) {
      console.error('Error saving result:', err);
      alert('Failed to save result.');
    }
  };

  const resetForm = () => {
    setForm({ id: null, title: '', file: null });
  };

  const handleEdit = (item) => {
    setForm({ id: item.id, title: item.title, file: null });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this result?')) {
      try {
        await api.delete(`/api/results/${id}`);
        fetchResults();
      } catch (err) {
        console.error('Error deleting result:', err);
        alert('Failed to delete result.');
      }
    }
  };

  return (
    <div className="border p-6 bg-white rounded shadow mb-10">
      <h2 className="text-xl font-semibold mb-4 text-blue-800">Manage Results</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Result Title"
          required
          className="border px-4 py-2 rounded"
        />
        <input
          type="file"
          name="file"
          accept=".pdf"
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

      <ul className="space-y-3">
        {results.map((result) => (
          <li key={result.id} className="flex justify-between items-center bg-gray-100 p-3 rounded">
            <a
              href={`/api/results/${result.id}/file`} // or result.filePath if static URL
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline font-medium"
            >
              {result.title}
            </a>
            <div className="flex gap-3">
              <button onClick={() => handleEdit(result)} className="text-blue-600 hover:underline">Edit</button>
              <button onClick={() => handleDelete(result.id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultAdmin;
