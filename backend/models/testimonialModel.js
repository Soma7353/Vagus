const db = require('../config/db');

// Get all testimonials
const getAllTestimonials = async () => {
  const [testimonials] = await db.query('SELECT * FROM testimonials');
  return testimonials;
};

// Get a single testimonial by ID
const getTestimonialById = async (id) => {
  const [testimonial] = await db.query('SELECT * FROM testimonials WHERE id = ?', [id]);
  return testimonial[0];
};

// Create a new testimonial
const createTestimonial = async ({ name, message, college, video_link }) => {
  const query = `
    INSERT INTO testimonials (name, message, college, video_link)
    VALUES (?, ?, ?, ?)
  `;
  const [result] = await db.query(query, [name, message, college, video_link]);
  return result.insertId;
};

// Update an existing testimonial
const updateTestimonial = async (id, { name, message, college, video_link }) => {
  const query = `
    UPDATE testimonials
    SET name = ?, message = ?, college = ?, video_link = ?
    WHERE id = ?
  `;
  const [result] = await db.query(query, [name, message, college, video_link, id]);
  return result.affectedRows;
};

// Delete a testimonial
const deleteTestimonial = async (id) => {
  const [result] = await db.query('DELETE FROM testimonials WHERE id = ?', [id]);
  return result.affectedRows;
};

module.exports = {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
