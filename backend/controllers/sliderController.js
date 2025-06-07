const Slider = require('../models/Slider');

// POST /api/slider
exports.uploadImage = async (req, res) => {
  try {
    const { buffer, mimetype } = req.file;
    const slider = await Slider.create({ photo: buffer, mimeType: mimetype });
    res.status(201).json({ id: slider.id });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
};

// GET /api/slider
exports.getAllImageIds = async (req, res) => {
  try {
    const sliders = await Slider.findAll({ attributes: ['id'] });
    res.json(sliders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch image IDs' });
  }
};

// GET /api/slider/image/:id
exports.getImageById = async (req, res) => {
  try {
    const slider = await Slider.findByPk(req.params.id);
    if (!slider) return res.status(404).send('Image not found');

    res.set('Content-Type', slider.mimeType);
    res.send(slider.photo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load image' });
  }
};

// DELETE /api/slider/:id
exports.deleteImageById = async (req, res) => {
  try {
    const deleted = await Slider.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Image not found' });

    res.json({ message: 'Image deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete image' });
  }
};
