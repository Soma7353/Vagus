import React, { useEffect, useState } from 'react';
import api from '../../api'; // axios instance

const ResultAdmin = () => {
  const [results, setResults] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: '',
    file: null,
  });

  // Fetch all results from backend
  const fetchResults = async () => {
    try {
      const res = await api.get('/api/results');
      setResults(res.data);
    } catch (err) {
      console.error('Error fetching results:', err);
      alert('Failed to load results.');
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  // Handle input change
  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Submit form
  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', form.title);
    if (form.file) {
      formData.append('file', form.file);
    }

    try {
      if (form.id) {
        await api.put(`/api/results/${form.id}`, formData);
      } else {
        await api.post('/api/results', formData);
      }
      fetchResults();
      resetForm();
    } catch (err) {
      console.error('Error submitting result:', err);
      alert('Failed to save result.');
    }
  };

  const resetForm = () => {
    setForm({ id: null, title: '', file: null });
  };

  // Load data into form for editing
  const handleEdit = item => {
    setForm({ id: item.id, title: item.title, file: null });
  };

  // Delete a result
  const handleDelete = async id => {
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
    <div className="border p-4 bg-white rounded shadow mb-8">
      <h2 className="text-xl font-bold mb-4">Manage Results</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Result Title"
          required
          className="border p-2 rounded"
        />
        <input
          type="file"
          name="file"
          accept=".pdf"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded col-span-1 md:col-span-2"
        >
          {form.id ? 'Update Result' : 'Add Result'}
        </button>
      </form>

      <ul className="space-y-3">
        {results.map(result => (
          <li key={result.id} className="flex justify-between items-center bg-gray-100 p-3 rounded">
            <a
              href={result.filePath}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline"
            >
              {result.title}
            </a>
            <div className="flex gap-4">
              <button onClick={() => handleEdit(result)} className="text-blue-600">Edit</button>
              <button onClick={() => handleDelete(result.id)} className="text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultAdmin;
