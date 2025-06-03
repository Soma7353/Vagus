require('dotenv').config(); // ✅ Load environment variables from .env

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// ✅ Secure & flexible CORS setup
app.use(cors({
  origin: ['https://vagus.vercel.app'], // ✅ Deployed frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static file serving for uploaded images/files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Routes
const galleryRoutes = require('./routes/galleryRoutes');
const resultRoutes = require('./routes/resultRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const downloadRoutes = require('./routes/downloadRoutes');
const authRoutes = require('./routes/authRoutes');

// ✅ Route mounting
app.use('/api/gallery', galleryRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/downloads', downloadRoutes);
app.use('/api/auth', authRoutes);

// ✅ Basic health check
app.get('/', (req, res) => {
  res.send('✅ NEET Academy API is running');
});

// ✅ Global error handler (optional but useful)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke on the server!', error: err.message });
});

module.exports = app;
