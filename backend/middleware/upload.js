const multer = require('multer');
const path = require('path');

// Memory storage for BLOB upload
const storage = multer.memoryStorage();

// Only allow specific file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  if (extname) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
  }
};

// Multer instance
const upload = multer({ storage, fileFilter });

module.exports = upload;
