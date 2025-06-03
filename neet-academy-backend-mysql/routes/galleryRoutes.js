const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const upload = require('../middleware/uploadMiddleware');

router.post('/', upload.single('image'), galleryController.uploadImage);
router.get('/', galleryController.getAllImages);
router.get('/:id/image', galleryController.getImageById); // <--- serve image content here
router.put('/:id', upload.single('image'), galleryController.updateImage);
router.delete('/:id', galleryController.deleteImage);

module.exports = router;
