const express = require('express');
const multer = require('multer');
const router = express.Router();
const resultController = require('../controllers/resultController');

// Store uploaded files in memory (Buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.get('/', resultController.getAllResults);
router.get('/image/:id', resultController.getResultImage);
router.post('/', upload.single('image'), resultController.createResult);
router.put('/:id', upload.single('image'), resultController.updateResult);
router.delete('/:id', resultController.deleteResult);

module.exports = router;

