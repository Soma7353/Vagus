const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Result } = require('../models');

// Setup multer for results uploads
const uploadDir = path.join(__dirname, '..', 'uploads', 'results');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// Routes
router.get('/', async (req, res) => {
  try {
    const results = await Result.findAll({ order: [['createdAt', 'DESC']] });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { name, rank, college, year, color } = req.body;
    const photo = req.file ? `/uploads/results/${req.file.filename}` : null;
    const result = await Result.create({ name, rank, college, year, color, photo });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add result' });
  }
});

// ... add update, delete routes similarly

module.exports = router;
