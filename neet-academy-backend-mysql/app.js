require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// ✅ CORS Configuration — allow your frontend
app.use(cors({
  origin: ['https://vagus.vercel.app'], // Replace with your deployed frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// ✅ Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static files (for uploaded images/files)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Import route modules
const galleryRoutes = require('./routes/galleryRoutes');
const resultRoutes = require('./routes/resultRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const downloadRoutes = require('./routes/downloadRoutes');
const authRoutes = require('./routes/authRoutes');

// ✅ Route registration
app.use('/api/gallery', galleryRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/downloads', downloadRoutes);
app.use('/api/auth', authRoutes);

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('✅ NEET Academy API is running');
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Global Error:', err.stack);
  res.status(500).json({
    message: 'Something broke on the server!',
    error: err.message,
  });
});

module.exports = app;
