const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Result } = require('../models');

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, '..', 'uploads', 'results');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// GET all
router.get('/', async (req, res) => {
  try {
    const results = await Result.findAll({ order: [['createdAt', 'DESC']] });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

// GET one
router.get('/:id', async (req, res) => {
  try {
    const result = await Result.findByPk(req.params.id);
    if (!result) return res.status(404).json({ error: 'Result not found' });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching result' });
  }
});

// POST create
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { name, rank, college, year, color } = req.body;
    const photo = req.file ? `/uploads/results/${req.file.filename}` : null;

    const result = await Result.create({ name, rank, college, year, color, photo });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

// PUT update
router.put('/:id', upload.single('photo'), async (req, res) => {
  try {
    const result = await Result.findByPk(req.params.id);
    if (!result) return res.status(404).json({ error: 'Result not found' });

    const { name, rank, college, year, color } = req.body;
    const photo = req.file ? `/uploads/results/${req.file.filename}` : result.photo;

    await result.update({ name, rank, college, year, color, photo });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const result = await Result.findByPk(req.params.id);
    if (!result) return res.status(404).json({ error: 'Result not found' });

    await result.destroy();
    res.json({ message: 'Result deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
