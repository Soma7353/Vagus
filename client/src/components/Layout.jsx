// src/components/Layout.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="pt-28">{children}</main> {/* Adds spacing below fixed navbar */}
      <Footer />
    </>
  );
};

export default Layout;
