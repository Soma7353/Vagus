const db = require('../config/db');

const getAllGalleryItems = async () => {
  const [items] = await db.query('SELECT id, title, image_type, uploaded_at FROM gallery');
  return items;
};

const getGalleryItemById = async (id) => {
  const [item] = await db.query('SELECT * FROM gallery WHERE id = ?', [id]);
  return item[0];
};

const createGalleryItem = async ({ title, image, image_type }) => {
  const query = 'INSERT INTO gallery (title, image, image_type) VALUES (?, ?, ?)';
  await db.query(query, [title, image, image_type]);
};

const updateGalleryItem = async (id, { title, image, image_type }) => {
  const query = 'UPDATE gallery SET title = ?, image = ?, image_type = ? WHERE id = ?';
  await db.query(query, [title, image, image_type, id]);
};

const deleteGalleryItem = async (id) => {
  await db.query('DELETE FROM gallery WHERE id = ?', [id]);
};

module.exports = {
  getAllGalleryItems,
  getGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
};
