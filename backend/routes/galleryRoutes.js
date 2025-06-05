// routes/galleryRoutes.js
const express          = require('express');
const router           = express.Router();
const upload           = require('../middleware/upload');   // memoryStorage
const galleryCtrl      = require('../controllers/galleryController');

router.get('/',                galleryCtrl.getAllGalleryItems);
router.get('/image/:id',       galleryCtrl.getGalleryImage);      // <-- inline
router.get('/download/:id',    galleryCtrl.downloadGalleryImage); // <-- attachment

router.post('/',               upload.single('image'), galleryCtrl.createGalleryItem);
router.put('/:id',             upload.single('image'), galleryCtrl.updateGalleryItem);
router.delete('/:id',          galleryCtrl.deleteGalleryItem);

module.exports = router;
