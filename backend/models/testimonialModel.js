const db = require('../config/db');

const getAllTestimonials = async () => {
  const [testimonials] = await db.query('SELECT * FROM testimonials');
  return testimonials;
};

const getTestimonialById = async (id) => {
  const [testimonial] = await db.query('SELECT * FROM testimonials WHERE id = ?', [id]);
  return testimonial[0];
};

const createTestimonial = async ({ name, message, video_link }) => {
  const query = 'INSERT INTO testimonials (name, message, video_link) VALUES (?, ?, ?)';
  await db.query(query, [name, message, video_link]);
};

const updateTestimonial = async (id, { name, message, video_link }) => {
  const query = 'UPDATE testimonials SET name = ?, message = ?, video_link = ? WHERE id = ?';
  await db.query(query, [name, message, video_link, id]);
};

const deleteTestimonial = async (id) => {
  await db.query('DELETE FROM testimonials WHERE id = ?', [id]);
};

module.exports = {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
