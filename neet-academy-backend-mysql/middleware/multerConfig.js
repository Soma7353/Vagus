const multer = require('multer');

// Configure multer to store files in memory as Buffer (for BLOB)
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit files to 10 MB
  },
  fileFilter: (req, file, cb) => {
    // Accept any file type (optional: you can restrict by mimetype here)
    cb(null, true);
  },
});

module.exports = upload;
