import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', credentials);
      if (res.data.success) {
        sessionStorage.setItem('isAdmin', 'true');
        navigate('/admin');
      }
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input className="input mb-2" placeholder="Username" onChange={e => setCredentials({ ...credentials, username: e.target.value })} required />
        <input type="password" className="input mb-4" placeholder="Password" onChange={e => setCredentials({ ...credentials, password: e.target.value })} required />
        <button className="btn w-full">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
