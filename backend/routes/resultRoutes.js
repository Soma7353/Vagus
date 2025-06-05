const express = require('express');
const router  = express.Router();
const upload  = require('../middleware/upload');
const ctrl    = require('../controllers/resultController');

router.get('/',          ctrl.getAllResults);
router.get('/file/:id',  ctrl.downloadResult);           // attachment
router.post('/',         upload.single('file'), ctrl.createResult);
router.put('/:id',       upload.single('file'), ctrl.updateResult);
router.delete('/:id',    ctrl.deleteResult);

module.exports = router;
