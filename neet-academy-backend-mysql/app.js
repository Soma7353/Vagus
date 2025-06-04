require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://vagus.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files for uploads
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

// Root route
app.get('/', (req, res) => {
  res.send('✅ NEET Academy API is running');
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

module.exports = app;