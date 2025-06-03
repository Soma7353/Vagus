const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure directory exists
const downloadDir = path.join(__dirname, '..', 'uploads', 'downloads');
fs.mkdirSync(downloadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, downloadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

module.exports = upload