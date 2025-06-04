const db = require('../config/db');

const getAllResults = async () => {
  const [results] = await db.query('SELECT id, name, rank, college, year, photo_type FROM results');
  return results;
};

const getResultById = async (id) => {
  const [result] = await db.query('SELECT * FROM results WHERE id = ?', [id]);
  return result[0];
};

const createResult = async ({ name, rank, college, year, photo, photo_type }) => {
  const query = 'INSERT INTO results (name, rank, college, year, photo, photo_type) VALUES (?, ?, ?, ?, ?, ?)';
  await db.query(query, [name, rank, college, year, photo, photo_type]);
};

const updateResult = async (id, { name, rank, college, year, photo, photo_type }) => {
  const query = 'UPDATE results SET name = ?, rank = ?, college = ?, year = ?, photo = ?, photo_type = ? WHERE id = ?';
  await db.query(query, [name, rank, college, year, photo, photo_type, id]);
};

const deleteResult = async (id) => {
  await db.query('DELETE FROM results WHERE id = ?', [id]);
};

module.exports = {
  getAllResults,
  getResultById,
  createResult,
  updateResult,
  deleteResult,
};
