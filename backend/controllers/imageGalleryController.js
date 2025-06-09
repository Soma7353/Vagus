const { GalleryCategory, CategorizedImage } = require('../models');
const path = require('path');
const fs = require('fs');
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

exports.getCategories = async (req, res) => {
  try {
    const categories = await GalleryCategory.findAll();
    res.json(categories);
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

exports.getImagesByCategory = async (req, res) => {
  try {
    const images = await CategorizedImage.findAll({
      where: { category_id: req.params.id },
    });
    res.json(images);
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    const { categoryId } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const newImage = await CategorizedImage.create({
      photo: file.filename,
      category_id: categoryId,
    });

    res.json(newImage);
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ error: 'Upload failed' });
  }
};

exports.getImage = async (req, res) => {
  try {
    const img = await CategorizedImage.findByPk(req.params.id);
    if (!img) return res.status(404).send('Not found');

    const filePath = path.join(uploadDir, img.photo);
    res.sendFile(filePath);
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ error: 'Failed to load image' });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const img = await CategorizedImage.findByPk(req.params.id);
    if (!img) return res.status(404).send('Not found');

    const filePath = path.join(uploadDir, img.photo);
    fs.unlinkSync(filePath);
    await img.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ error: 'Delete failed' });
  }
};
