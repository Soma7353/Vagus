const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Download } = require('../models');

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, '..', 'uploads', 'downloads');
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
    const downloads = await Download.findAll({ order: [['createdAt', 'DESC']] });
    res.json(downloads);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch downloads' });
  }
});

// GET one
router.get('/:id', async (req, res) => {
  try {
    const download = await Download.findByPk(req.params.id);
    if (!download) return res.status(404).json({ error: 'Download not found' });
    res.json(download);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching download' });
  }
});

// POST create
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { title } = req.body;
    const filePath = `/uploads/downloads/${req.file.filename}`;

    const download = await Download.create({ title, filePath });
    res.json(download);
  } catch (err) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

// PUT update
router.put('/:id', upload.single('file'), async (req, res) => {
  try {
    const download = await Download.findByPk(req.params.id);
    if (!download) return res.status(404).json({ error: 'Download not found' });

    const { title } = req.body;
    const filePath = req.file ? `/uploads/downloads/${req.file.filename}` : download.filePath;

    await download.update({ title, filePath });
    res.json(download);
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const download = await Download.findByPk(req.params.id);
    if (!download) return res.status(404).json({ error: 'Download not found' });

    await download.destroy();
    res.json({ message: 'Download deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
