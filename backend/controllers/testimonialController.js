// backend/controllers/testimonialController.js
const testimonialModel = require('../models/testimonialModel');

const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await testimonialModel.getAllTestimonials();
    res.json(testimonials);
  } catch (err) {
    console.error('Error fetching testimonials:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createTestimonial = async (req, res) => {
  const { name = '', iframe = '', message = '', college = '', year = '' } = req.body;
  try {
    await testimonialModel.createTestimonial({ name, iframe, message, college, year });
    res.status(201).json({ message: 'Testimonial created successfully' });
  } catch (err) {
    console.error('Error creating testimonial:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateTestimonial = async (req, res) => {
  const { id } = req.params;
  const { name = '', iframe = '', message = '', college = '', year = '' } = req.body;
  try {
    await testimonialModel.updateTestimonial(id, { name, iframe, message, college, year });
    res.json({ message: 'Testimonial updated successfully' });
  } catch (err) {
    console.error('Error updating testimonial:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteTestimonial = async (req, res) => {
  const { id } = req.params;
  try {
    await testimonialModel.deleteTestimonial(id);
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (err) {
    console.error('Error deleting testimonial:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
