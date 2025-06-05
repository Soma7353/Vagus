const galleryModel = require('../models/galleryModel');

const getAllGalleryItems = async (req, res) => {
  try {
    const gallery = await galleryModel.getAllGalleryItems();
    res.json(gallery);
  } catch (err) {
    console.error('Error fetching gallery:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createGalleryItem = async (req, res) => {
  const { title } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No image file uploaded' });
  }

  try {
    await galleryModel.createGalleryItem({
      title,
      image: file.buffer,
      image_type: file.mimetype,
    });
    res.status(201).json({ message: 'Gallery item created successfully' });
  } catch (err) {
    console.error('Error creating gallery item:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateGalleryItem = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const file = req.file;

  try {
    const existing = await galleryModel.getGalleryItemById(id);
    if (!existing) return res.status(404).json({ error: 'Gallery item not found' });

    await galleryModel.updateGalleryItem(id, {
      title,
      image: file ? file.buffer : existing.image,
      image_type: file ? file.mimetype : existing.image_type,
    });

    res.json({ message: 'Gallery item updated successfully' });
  } catch (err) {
    console.error('Error updating gallery item:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteGalleryItem = async (req, res) => {
  const { id } = req.params;
  try {
    await galleryModel.deleteGalleryItem(id);
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (err) {
    console.error('Error deleting gallery item:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getGalleryImage = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await galleryModel.getGalleryItemById(id);
    if (!item || !item.image) return res.status(404).json({ error: 'Image not found' });

    res.set('Content-Type', item.image_type);
    res.send(item.image);
  } catch (err) {
    console.error('Error fetching gallery image:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const downloadGalleryImage = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await galleryModel.getGalleryItemById(id);
    if (!item || !item.image) return res.status(404).json({ error: 'Image not found' });

    res.set('Content-Type', item.image_type);
    res.set('Content-Disposition', `attachment; filename="${item.title.replace(/[^a-z0-9]/gi, '_')}.jpg"`);
    res.send(item.image);
  } catch (err) {
    console.error('Error downloading gallery image:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getGalleryImage,
  downloadGalleryImage,
};
