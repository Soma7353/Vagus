const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const createDirIfNotExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const galleryDir = path.join(__dirname, 'uploads/gallery');
const downloadsDir = path.join(__dirname, 'uploads/downloads');
createDirIfNotExists(galleryDir);
createDirIfNotExists(downloadsDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (req.baseUrl.includes('gallery')) {
      cb(null, galleryDir);
    } else if (req.baseUrl.includes('downloads')) {
      cb(null, downloadsDir);
    } else {
      cb(new Error('Invalid upload route'));
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });
module.exports = upload;