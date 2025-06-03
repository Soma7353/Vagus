const express = require('express');
const router = express.Router();
const downloadController = require('../controllers/downloadController');
const upload = require('../middleware/uploadMiddleware');

router.post('/', upload.single('file'), downloadController.uploadFile);
router.get('/', downloadController.getAllDownloads);
router.get('/:id/download', downloadController.downloadFile); // <--- file download route
router.put('/:id', upload.single('file'), downloadController.updateDownload);
router.delete('/:id', downloadController.deleteDownload);

module.exports = router;
