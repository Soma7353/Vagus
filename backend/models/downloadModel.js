const db = require('../config/db');

const getAllDownloads = async () => {
  const [downloads] = await db.query('SELECT id, title, file_type, uploaded_at FROM downloads');
  return downloads;
};

const getDownloadById = async (id) => {
  const [download] = await db.query('SELECT * FROM downloads WHERE id = ?', [id]);
  return download[0];
};

const createDownload = async ({ title, file, file_type }) => {
  const query = 'INSERT INTO downloads (title, file, file_type) VALUES (?, ?, ?)';
  await db.query(query, [title, file, file_type]);
};

const updateDownload = async (id, { title, file, file_type }) => {
  const query = 'UPDATE downloads SET title = ?, file = ?, file_type = ? WHERE id = ?';
  await db.query(query, [title, file, file_type, id]);
};

const deleteDownload = async (id) => {
  await db.query('DELETE FROM downloads WHERE id = ?', [id]);
};

module.exports = {
  getAllDownloads,
  getDownloadById,
  createDownload,
  updateDownload,
  deleteDownload,
};
