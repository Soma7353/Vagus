const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); // ✅ Import multer middleware
const downloadController = require('../controllers/downloadController');

router.get('/', downloadController.getAllDownloads);
router.post('/', upload.single('file'), downloadController.createDownload);
router.put('/:id', upload.single('file'), downloadController.updateDownload);
router.delete('/:id', downloadController.deleteDownload);

module.exports = router;
