const express = require('express');
const router = express.Router();
const controller = require('../controllers/resultController');
const upload = require('../middleware/multerConfig');

router.post('/', upload.single('file'), controller.upload);
router.get('/', controller.getAll);
router.get('/:id', controller.getFile);
router.delete('/:id', controller.delete);

module.exports = router;
