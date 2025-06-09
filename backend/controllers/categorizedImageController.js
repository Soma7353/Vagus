// controllers/categorizedImageController.js
const db = require('../models');
const fs = require('fs');
const path = require('path');

const CategorizedImage = db.CategorizedImage;
const GalleryCategory = db.GalleryCategory;

// ───── Add Image ─────
exports.addImage = async (req, res) => {
  try {
    const { category_id } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const imageData = fs.readFileSync(req.file.path);
    fs.unlinkSync(req.file.path); // remove temp file

    const newImage = await CategorizedImage.create({
      category_id,
      photo: imageData
    });

    res.status(201).json(newImage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to upload image' });
  }
};

// ───── Get All Categories ─────
exports.getCategories = async (req, res) => {
  try {
    const categories = await GalleryCategory.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
};

// ───── Get Images by Category ─────
exports.getImagesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const images = await CategorizedImage.findAll({
      where: { category_id: categoryId },
      order: [['created_at', 'DESC']]
    });

    res.json(images.map((img) => ({
      id: img.id,
      created_at: img.created_at,
      category_id: img.category_id,
      photoUrl: `/api/galleryy/image/${img.id}`
    })));
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch images' });
  }
};

// ───── Serve Single Image ─────
exports.getImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await CategorizedImage.findByPk(id);

    if (!image) return res.status(404).send('Image not found');

    res.set('Content-Type', 'image/jpeg'); // or 'image/png' if you're uploading pngs
    res.send(image.photo);
  } catch (err) {
    res.status(500).send('Failed to load image');
  }
};

// ───── Delete Image ─────
exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await CategorizedImage.findByPk(id);

    if (!image) return res.status(404).json({ message: 'Image not found' });

    await image.destroy();
    res.json({ message: 'Image deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete image' });
  }
};
