const { GalleryImage } = require('../models');
const path = require('path');
const fs = require('fs');

exports.uploadImage = async (req, res) => {
  try {
    const { title } = req.body;
    const image = req.file?.filename;

    if (!image) return res.status(400).json({ message: 'No image uploaded.' });

    const newImage = await GalleryImage.create({ title, image });
    res.status(201).json(newImage);
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Server error during image upload.' });
  }
};

exports.getAllImages = async (req, res) => {
  try {
    const images = await GalleryImage.findAll({ order: [['createdAt', 'DESC']] });
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Error fetching gallery images.' });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const image = await GalleryImage.findByPk(req.params.id);
    if (!image) return res.status(404).json({ message: 'Image not found.' });

    const filePath = path.join(__dirname, '..', 'uploads', 'gallery', image.image);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await image.destroy();
    res.json({ message: 'Image deleted.' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Error deleting image.' });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const image = await GalleryImage.findByPk(req.params.id);
    if (!image) return res.status(404).json({ message: 'Image not found.' });

    const newFile = req.file?.filename;
    const { title } = req.body;

    if (newFile && image.image) {
      const oldFilePath = path.join(__dirname, '..', 'uploads', 'gallery', image.image);
      if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
    }

    image.title = title || image.title;
    image.image = newFile || image.image;
    await image.save();

    res.json(image);
  } catch (error) {
    console.error('Error updating image:', error);
    res.status(500).json({ message: 'Error updating image.' });
  }
};
