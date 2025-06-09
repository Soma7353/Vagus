const { GalleryCategory, CategorizedImage } = require('../models');

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await GalleryCategory.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching categories', details: err.message });
  }
};

// Get images by category
exports.getImagesByCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const images = await CategorizedImage.findAll({
      where: { category_id: categoryId },
      include: {
        model: GalleryCategory,
        as: 'category',
        attributes: ['id', 'name']
      }
    });

    res.json(images);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching images', details: err.message });
  }
};

// Get all images with category
exports.getAllImages = async (req, res) => {
  try {
    const images = await CategorizedImage.findAll({
      include: {
        model: GalleryCategory,
        as: 'category',
        attributes: ['id', 'name']
      }
    });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching all images', details: err.message });
  }
};
