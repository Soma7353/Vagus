// routes/categorizedImageRoutes.js
const express = require('express');
const router = express.Router();
const categorizedImageController = require('../controllers/categorizedImageController');
const multer = require('multer');
const path = require('path');

// Use multer to temporarily store files before reading
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// ───── ROUTES ─────

// Upload an image under a specific category
router.post('/upload', upload.single('photo'), categorizedImageController.addImage);

// Get all image categories
router.get('/categories', categorizedImageController.getCategories);

// Get all images for a category
router.get('/category/:categoryId', categorizedImageController.getImagesByCategory);

// Serve image by ID (BLOB to image URL)
router.get('/image/:id', categorizedImageController.getImage);

// Delete image by ID
router.delete('/:id', categorizedImageController.deleteImage);

module.exports = router;
