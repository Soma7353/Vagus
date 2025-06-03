// uploadMiddleware.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Utility to ensure directory exists
const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Multer storage configuration (flexible for different types)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = req.baseUrl.includes('gallery') ? 'gallery' : 'downloads';
    const uploadPath = path.join(__dirname, 'uploads', type);
    ensureDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

// Export the middleware
const upload = multer({ storage });

module.exports = upload;
