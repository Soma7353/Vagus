const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let subfolder = 'gallery';
    if (req.originalUrl.includes('/downloads')) {
      subfolder = 'downloads';
    } else if (req.originalUrl.includes('/results')) {
      subfolder = 'results';
    } else if (req.originalUrl.includes('/testimonials')) {
      subfolder = 'testimonials';
    }

    const uploadPath = path.join(__dirname, '..', 'uploads', subfolder);
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const sanitized = file.originalname.replace(/\s+/g, '_');
    cb(null, Date.now() + '-' + sanitized);
  }
});

module.exports = multer({ storage });
