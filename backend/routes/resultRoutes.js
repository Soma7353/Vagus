// routes/resultRoutes.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
const resultController = require('../controllers/resultController');

// Use memory storage for storing file in buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.get('/', resultController.getAllResults);
router.get('/image/:id', resultController.getResultImage);
router.post('/', upload.single('image'), resultController.createResult);
router.put('/:id', upload.single('image'), resultController.updateResult);
router.delete('/:id', resultController.deleteResult);

module.exports = router;
