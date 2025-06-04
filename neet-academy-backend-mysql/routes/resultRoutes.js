const express = require('express');
const router = express.Router();
const multer = require('../middleware/multerConfig'); // your multer config for storage
const path = require('path');
const fs = require('fs');

// Mock DB for demo
const results = [
  // { id: 1, title: 'Result 2023', filePath: '/uploads/results/result1.pdf' }
];

// Helper to find index
const findIndexById = (id) => results.findIndex(item => item.id === parseInt(id));

// GET all results
router.get('/', (req, res) => {
  res.json(results);
});

// POST add new result file
router.post('/', multer.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Result file is required' });
  }
  const { title } = req.body;
  const newItem = {
    id: Date.now(),
    title,
    filePath: `/uploads/results/${req.file.filename}`
  };
  results.push(newItem);
  res.status(201).json(newItem);
});

// PUT update result info (and optionally replace file)
router.put('/:id', multer.single('file'), (req, res) => {
  const id = req.params.id;
  const idx = findIndexById(id);
  if (idx === -1) return res.status(404).json({ error: 'Result not found' });

  const item = results[idx];
  item.title = req.body.title || item.title;

  if (req.file) {
    // Delete old file
    const oldPath = path.join(__dirname, '..', item.filePath);
    fs.unlink(oldPath, err => {
      if (err) console.error('Error deleting old result file:', err);
    });

    item.filePath = `/uploads/results/${req.file.filename}`;
  }

  res.json(item);
});

// DELETE a result file
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const idx = findIndexById(id);
  if (idx === -1) return res.status(404).json({ error: 'Result not found' });

  const item = results[idx];
  const filePath = path.join(__dirname, '..', item.filePath);

  fs.unlink(filePath, err => {
    if (err) console.error('Failed to delete result file:', err);
  });

  results.splice(idx, 1);
  res.json({ message: 'Result deleted' });
});

module.exports = router;
