const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); // ✅ multer middleware
const downloadController = require('../controllers/downloadController');

router.get('/', downloadController.getAllDownloads);
router.post('/', upload.single('file'), downloadController.createDownload);
router.put('/:id', upload.single('file'), downloadController.updateDownload);
router.delete('/:id', downloadController.deleteDownload);

// ✅ Route to serve/download file from DB as attachment
router.get('/download/:id', downloadController.downloadFile);

module.exports = router;
