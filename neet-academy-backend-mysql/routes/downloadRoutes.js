const express = require('express');
const router = express.Router();
const controller = require('../controllers/downloadController');
const upload = require('../middleware/multerConfig');

router.post('/', upload.single('file'), controller.uploadFile);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.delete('/:id', controller.delete);

module.exports = router;
