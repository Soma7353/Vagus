const express = require('express');
const router = express.Router();
const downloadController = require('../controllers/downloadController');
const upload = require('../uploadMiddleware');

router.post('/', upload.single('file'), downloadController.uploadFile);
router.get('/', downloadController.getAllDownloads);
router.delete('/:id', downloadController.deleteDownload);
router.put('/:id', upload.single('file'), downloadController.updateDownload);

module.exports = router;