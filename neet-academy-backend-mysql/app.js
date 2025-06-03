const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// ✅ CORS setup - allow only your actual frontend domain
app.use(cors({
  origin: 'https://vagus.vercel.app', // ✅ Replace with your actual deployed frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// ✅ Middleware to parse JSON and urlencoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Import routes
const galleryRoutes = require('./routes/galleryRoutes');
const resultRoutes = require('./routes/resultRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const downloadRoutes = require('./routes/downloadRoutes');
const authRoutes = require('./routes/authRoutes');

// ✅ Use routes
app.use('/api/gallery', galleryRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/downloads', downloadRoutes);
app.use('/api/auth', authRoutes);

// ✅ Default test route
app.get('/', (req, res) => {
  res.send('NEET Academy API is running');
});

module.exports = app;
