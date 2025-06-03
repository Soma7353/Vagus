const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const galleryController = require('../controllers/galleryController');

// Ensure uploads/gallery directory exists
const uploadDir = path.join(__dirname, '..', 'uploads', 'gallery');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Routes
router.post('/', upload.single('image'), galleryController.uploadImage);
router.get('/', galleryController.getAllImages);
router.delete('/:id', galleryController.deleteImage);
router.put('/:id', upload.single('image'), galleryController.updateImage);

module.exports = router;
