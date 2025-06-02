const Gallery = require('../models/GalleryImage');
const fs = require('fs');
const path = require('path');

// Upload new image
exports.uploadImage = async (req, res) => {
  try {
    const { title } = req.body;
    const filePath = `/uploads/gallery/${req.file.filename}`;
    const image = await Gallery.create({ title, filePath });
    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};

// Get all images
exports.getAllImages = async (req, res) => {
  try {
    const images = await Gallery.findAll({ order: [['createdAt', 'DESC']] });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching images', error: err.message });
  }
};

// Delete image
exports.deleteImage = async (req, res) => {
  try {
    const id = req.params.id;
    const image = await Gallery.findByPk(id);
    if (!image) return res.status(404).json({ message: 'Image not found' });

    const filePath = path.join(__dirname, '..', image.filePath);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await image.destroy();
    res.json({ message: 'Image deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting image', error: err.message });
  }
};

// Update image or title
exports.updateImage = async (req, res) => {
  try {
    const id = req.params.id;
    const gallery = await Gallery.findByPk(id);
    if (!gallery) return res.status(404).json({ message: 'Image not found' });

    if (req.file) {
      // Delete old file
      const oldPath = path.join(__dirname, '..', gallery.filePath);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

      gallery.filePath = `/uploads/gallery/${req.file.filename}`;
    }

    if (req.body.title) {
      gallery.title = req.body.title;
    }

    await gallery.save();
    res.json(gallery);
  } catch (err) {
    res.status(500).json({ message: 'Error updating image', error: err.message });
  }
};