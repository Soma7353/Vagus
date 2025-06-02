import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPanel from './AdminPanel';

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('admin_logged_in') === 'true';
    if (!loggedIn) {
      navigate('/admin-login');
    }
  }, [navigate]);

  return <AdminPanel />;
};

export default Admin;
