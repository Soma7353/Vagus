const express = require('express');
const router = express.Router();
const multer = require('../middleware/multerConfig'); // your multer config for storage
const path = require('path');
const fs = require('fs');

// Mock DB for demo
const gallery = [
  // { id: 1, title: 'Sample Image', imagePath: '/uploads/gallery/image1.jpg' }
];

// Helper to find index
const findIndexById = (id) => gallery.findIndex(item => item.id === parseInt(id));

// GET all gallery images
router.get('/', (req, res) => {
  res.json(gallery);
});

// POST add new image
router.post('/', multer.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Image file is required' });
  }
  const { title } = req.body;
  const newItem = {
    id: Date.now(),
    title,
    imagePath: `/uploads/gallery/${req.file.filename}`
  };
  gallery.push(newItem);
  res.status(201).json(newItem);
});

// PUT update image info (and optionally replace image)
router.put('/:id', multer.single('image'), (req, res) => {
  const id = req.params.id;
  const idx = findIndexById(id);
  if (idx === -1) return res.status(404).json({ error: 'Gallery item not found' });

  const item = gallery[idx];
  item.title = req.body.title || item.title;

  if (req.file) {
    // Delete old file
    const oldPath = path.join(__dirname, '..', item.imagePath);
    fs.unlink(oldPath, err => {
      if (err) console.error('Error deleting old image:', err);
    });

    item.imagePath = `/uploads/gallery/${req.file.filename}`;
  }

  res.json(item);
});

// DELETE a gallery image
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const idx = findIndexById(id);
  if (idx === -1) return res.status(404).json({ error: 'Gallery item not found' });

  const item = gallery[idx];
  const filePath = path.join(__dirname, '..', item.imagePath);

  fs.unlink(filePath, err => {
    if (err) console.error('Failed to delete file:', err);
  });

  gallery.splice(idx, 1);
  res.json({ message: 'Gallery item deleted' });
});

module.exports = router;
