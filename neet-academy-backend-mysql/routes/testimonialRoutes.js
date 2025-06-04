const express = require('express');
const router = express.Router();
const controller = require('../controllers/testimonialController');
const upload = require('../middleware/multerConfig');

router.post('/', upload.single('image'), controller.create);
router.get('/', controller.getAll);
router.delete('/:id', controller.delete);

module.exports = router;
