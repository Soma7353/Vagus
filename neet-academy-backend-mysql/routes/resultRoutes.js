const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Result } = require('../models');

// Your multer config and routes here


router.post('/', upload.single('photo'), async (req, res) => {

  try {
    const { name, rank, college, year, color } = req.body;

    if (!req.file) return res.status(400).json({ error: 'Photo is required' });

    const result = await Result.create({
      name,
      rank,
      college,
      year,
      color,
      photo: req.file.buffer,
      photoMimeType: req.file.mimetype,
    });

    res.json(result);
  } catch (err) {
    console.error('Upload failed:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;
