require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Enable CORS
app.use(cors({
  origin: ['https://vagus.vercel.app'], // adjust if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads folder inside neet-academy-backend-mysql
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'neet-academy-backend-mysql', 'uploads'))
);

// Debug log for every request (optional but helpful)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// Import routes
const galleryRoutes = require('./neet-academy-backend-mysql/routes/galleryRoutes');
const resultRoutes = require('./neet-academy-backend-mysql/routes/resultRoutes');
const testimonialRoutes = require('./neet-academy-backend-mysql/routes/testimonialRoutes');
const downloadRoutes = require('./neet-academy-backend-mysql/routes/downloadRoutes');
const authRoutes = require('./neet-academy-backend-mysql/routes/authRoutes');

// Route handlers
app.use('/api/gallery', galleryRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/downloads', downloadRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.send('✅ NEET Academy API is running');
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message
  });
});

module.exports = app;
