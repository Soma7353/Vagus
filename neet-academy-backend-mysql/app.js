require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// CORS setup
app.use(cors({
  origin: ['https://vagus.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const galleryRoutes = require('./routes/galleryRoutes');
const resultRoutes = require('./routes/resultRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const downloadRoutes = require('./routes/downloadRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/gallery', galleryRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/downloads', downloadRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('✅ NEET Academy API is running');
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

module.exports = app;