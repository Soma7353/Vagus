const path = require('path');
const fs = require('fs');
const galleryModel = require('../models/galleryModel');

const createGalleryItem = async (req, res) => {
  try {
    const { title } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const image = fs.readFileSync(file.path);
    const image_type = file.mimetype;

    await galleryModel.createGalleryItem({ title, image, image_type });

    // Optional: delete temp file
    fs.unlinkSync(file.path);

    res.status(201).json({ message: 'Gallery item created successfully' });
  } catch (err) {
    console.error('Error creating gallery item:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const file = req.file;

    const existing = await galleryModel.getGalleryItemById(id);
    if (!existing) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }

    let image = existing.image;
    let image_type = existing.image_type;

    if (file) {
      image = fs.readFileSync(file.path);
      image_type = file.mimetype;
      fs.unlinkSync(file.path);
    }

    await galleryModel.updateGalleryItem(id, { title, image, image_type });

    res.json({ message: 'Gallery item updated successfully' });
  } catch (err) {
    console.error('Error updating gallery item:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
