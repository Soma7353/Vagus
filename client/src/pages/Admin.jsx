import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPanel from './AdminPanel';

const Admin = () => {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem('admin_logged_in') === 'true';
    if (!loggedIn) {
      navigate('/admin-login');
    } else {
      setCheckingAuth(false);
    }
  }, [navigate]);

  if (checkingAuth) return null; // or a spinner

  return <AdminPanel />;
};

export default Admin;
