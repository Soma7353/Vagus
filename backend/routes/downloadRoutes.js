const express = require('express');
const router = express.Router();
const downloadController = require('../controllers/downloadController');

router.get('/', downloadController.getAllDownloads);
router.post('/', downloadController.createDownload);
router.put('/:id', downloadController.updateDownload);
router.delete('/:id', downloadController.deleteDownload);

module.exports = router;
