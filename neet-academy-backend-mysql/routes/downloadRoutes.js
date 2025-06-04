const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Mock database model - replace with your actual DB model
const downloads = [
  // Example: { id: 1, title: "Sample", filePath: "/uploads/downloads/sample.pdf" }
];

// Helper to find index by id
const findIndexById = (id) => downloads.findIndex(d => d.id === parseInt(id));

// GET all downloads
router.get('/', (req, res) => {
  res.json(downloads);
});

// DELETE download by id
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  console.log('Received delete request for download id:', id);

  const idx = findIndexById(id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Download not found' });
  }

  const download = downloads[idx];

  // Delete file from disk if exists
  if (download.filePath) {
    const fullPath = path.join(__dirname, '..', download.filePath);
    fs.unlink(fullPath, err => {
      if (err) {
        console.error('Failed to delete file:', err);
        // Continue deleting DB entry even if file delete fails
      }
    });
  }

  // Remove from mock DB array (replace with actual DB delete)
  downloads.splice(idx, 1);

  res.json({ message: 'Download deleted' });
});

module.exports = router;
