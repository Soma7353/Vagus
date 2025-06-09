const express = require('express');
const router = express.Router();
const controller = require('../controllers/imageGalleryController');

router.get('/categories', controller.getCategories);
router.get('/categories/:id/images', controller.getImagesByCategory);
router.get('/images', controller.getAllImages);

module.exports = router;
