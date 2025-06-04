const express = require('express');
const router = express.Router();
const multer = require('multer');
const galleryController = require('../controllers/galleryController');

const upload = multer({ storage: multer.memoryStorage() });

router.get('/', galleryController.getAllImages);
router.get('/:id', galleryController.getImageById);
router.post('/', upload.single('photo'), galleryController.uploadImage);
router.put('/:id', upload.single('photo'), galleryController.updateImage);
router.delete('/:id', galleryController.deleteImage);

module.exports = router;
