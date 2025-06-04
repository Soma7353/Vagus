const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const db = require('./config/db');

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://vagus.vercel.app'],
  credentials: true,
}));

// Route Imports
const testimonialRoutes = require('./routes/testimonialRoutes');
const downloadRoutes = require('./routes/downloadRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const resultRoutes = require('./routes/resultRoutes');
const admin = require('./routes/admin'); // ✅ Added

// Route Mounting
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/downloads', downloadRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/auth', admin); // ✅ Mount /api/auth routes

// Default route
app.get('/', (req, res) => {
  res.send('NEET Academy API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
