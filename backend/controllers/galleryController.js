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
  const { title, image } = req.body;
  try {
    await galleryModel.createGalleryItem({ title, image });
    res.status(201).json({ message: 'Gallery item created successfully' });
  } catch (err) {
    console.error('Error creating gallery item:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateGalleryItem = async (req, res) => {
  const { id } = req.params;
  const { title, image } = req.body;
  try {
    await galleryModel.updateGalleryItem(id, { title, image });
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

module.exports = {
  getAllGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
};
