const GalleryImage = require('../models/GalleryImage');

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const image = await GalleryImage.create({
      title: req.body.title,
      image: req.file.buffer,       // store buffer (BLOB)
      mimeType: req.file.mimetype,  // store mime type
    });

    res.status(201).json(image);
  } catch (err) {
    console.error('Gallery upload error:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
};

exports.getAllImages = async (req, res) => {
  try {
    // Don't send blobs here (too big), just metadata
    const images = await GalleryImage.findAll({
      attributes: ['id', 'title', 'createdAt', 'updatedAt'],
    });
    res.status(200).json(images);
  } catch (err) {
    console.error('Gallery fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
};

exports.getImageById = async (req, res) => {
  try {
    const image = await GalleryImage.findByPk(req.params.id);
    if (!image) return res.status(404).json({ error: 'Image not found' });

    res.setHeader('Content-Type', image.mimeType);
    res.send(image.image);
  } catch (err) {
    console.error('Gallery get image error:', err);
    res.status(500).json({ error: 'Failed to get image' });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const image = await GalleryImage.findByPk(req.params.id);
    if (!image) return res.status(404).json({ error: 'Image not found' });

    await image.destroy();
    res.status(200).json({ message: 'Image deleted' });
  } catch (err) {
    console.error('Gallery delete error:', err);
    res.status(500).json({ error: 'Failed to delete image' });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const image = await GalleryImage.findByPk(req.params.id);
    if (!image) return res.status(404).json({ error: 'Image not found' });

    const updatedData = {
      title: req.body.title || image.title,
    };

    if (req.file) {
      updatedData.image = req.file.buffer;       // update blob
      updatedData.mimeType = req.file.mimetype;  // update mime type
    }

    await image.update(updatedData);
    res.status(200).json(image);
  } catch (err) {
    console.error('Gallery update error:', err);
    res.status(500).json({ error: 'Failed to update image' });
  }
};
