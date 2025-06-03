const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Result } = require('../models');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads', 'results');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// GET all results
router.get('/', async (req, res) => {
  try {
    const results = await Result.findAll({ order: [['createdAt', 'DESC']] });
    res.json(results);
  } catch (err) {
    console.error('Fetch all failed:', err);
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

// GET a single result by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await Result.findByPk(req.params.id);
    if (!result) return res.status(404).json({ error: 'Result not found' });
    res.json(result);
  } catch (err) {
    console.error('Fetch single failed:', err);
    res.status(500).json({ error: 'Error fetching result' });
  }
});

// POST create a new result
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    console.log('REQ BODY:', req.body);
    console.log('REQ FILE:', req.file);

    const { name, rank, college, year, color } = req.body;
    const photo = req.file ? `/uploads/results/${req.file.filename}` : null;

    const result = await Result.create({ name, rank, college, year, color, photo });
    res.json(result);
  } catch (err) {
    console.error('Upload failed:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// PUT update an existing result
router.put('/:id', upload.single('photo'), async (req, res) => {
  try {
    const result = await Result.findByPk(req.params.id);
    if (!result) return res.status(404).json({ error: 'Result not found' });

    const { name, rank, college, year, color } = req.body;
    const photo = req.file ? `/uploads/results/${req.file.filename}` : result.photo;

    await result.update({ name, rank, college, year, color, photo });
    res.json(result);
  } catch (err) {
    console.error('Update failed:', err);
    res.status(500).json({ error: 'Update failed' });
  }
});

// DELETE a result
router.delete('/:id', async (req, res) => {
  try {
    const result = await Result.findByPk(req.params.id);
    if (!result) return res.status(404).json({ error: 'Result not found' });

    await result.destroy();
    res.json({ message: 'Result deleted' });
  } catch (err) {
    console.error('Delete failed:', err);
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
