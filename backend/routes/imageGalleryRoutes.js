const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const controller = require('../controllers/imageGalleryController');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.get('/categories', controller.getCategories);
router.get('/categories/:id/images', controller.getImagesByCategory);
router.post('/images', upload.single('image'), controller.uploadImage);
router.get('/images/:id', controller.getImage);
router.delete('/images/:id', controller.deleteImage);

module.exports = router;
