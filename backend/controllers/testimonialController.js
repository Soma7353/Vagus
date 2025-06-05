// controllers/galleryController.js
const path         = require('path');
const galleryModel = require('../models/galleryModel');

/* GET /api/gallery */
exports.getAllGalleryItems = async (_req, res) => {
  try {
    const items = await galleryModel.getAllGalleryItems();
    res.json(items);
  } catch (err) {
    console.error('Gallery fetch error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/* GET /api/gallery/image/:id  – serve inline thumbnail/full-size */
exports.getGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;
    const item   = await galleryModel.getGalleryItemById(id);
    if (!item) return res.status(404).send('Not found');

    res.setHeader('Content-Type', item.image_type);
    res.send(Buffer.from(item.image));
  } catch (err) {
    console.error('Image send error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/* GET /api/gallery/download/:id  – force download */
exports.downloadGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;
    const item   = await galleryModel.getGalleryItemById(id);
    if (!item) return res.status(404).send('Not found');

    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${item.title}${path.extname(item.image_type)}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(Buffer.from(item.image));
  } catch (err) {
    console.error('Image download error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/* POST /api/gallery */
exports.createGalleryItem = async (req, res) => {
  try {
    const { title } = req.body;
    if (!req.file) return res.status(400).json({ error: 'Image required' });

    await galleryModel.createGalleryItem({
      title,
      image: req.file.buffer,
      image_type: req.file.mimetype,
    });
    res.status(201).json({ message: 'Gallery item created' });
  } catch (err) {
    console.error('Gallery create error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/* PUT /api/gallery/:id */
exports.updateGalleryItem = async (req, res) => {
  try {
    const { id }   = req.params;
    const { title }= req.body;
    const item     = await galleryModel.getGalleryItemById(id);
    if (!item) return res.status(404).send('Not found');

    await galleryModel.updateGalleryItem(id, {
      title,
      image      : req.file ? req.file.buffer   : item.image,
      image_type : req.file ? req.file.mimetype : item.image_type,
    });
    res.json({ message: 'Gallery item updated' });
  } catch (err) {
    console.error('Gallery update error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/* DELETE /api/gallery/:id */
exports.deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item   = await galleryModel.getGalleryItemById(id);
    if (!item) return res.status(404).send('Not found');

    await galleryModel.deleteGalleryItem(id);
    res.json({ message: 'Gallery item deleted' });
  } catch (err) {
    console.error('Gallery delete error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
