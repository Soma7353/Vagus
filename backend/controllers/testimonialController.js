// controllers/testimonialController.js
const testimonialModel = require('../models/testimonialModel');

// GET /api/testimonials
const getAllTestimonials = async (_req, res) => {
  try {
    const testimonials = await testimonialModel.getAllTestimonials();
    res.json(testimonials);
  } catch (err) {
    console.error('Error fetching testimonials:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET /api/testimonials/:id
const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await testimonialModel.getTestimonialById(req.params.id);
    if (!testimonial) return res.status(404).json({ error: 'Not found' });
    res.json(testimonial);
  } catch (err) {
    console.error('Error fetching testimonial:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST /api/testimonials
const createTestimonial = async (req, res) => {
  const { name, video_link, college, year, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required' });
  }

  try {
    const id = await testimonialModel.createTestimonial({
      name,
      video_link,
      college,
      year,
      message,
    });
    res.status(201).json({ id, message: 'Testimonial created successfully' });
  } catch (err) {
    console.error('Error creating testimonial:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// PUT /api/testimonials/:id
const updateTestimonial = async (req, res) => {
  const { name, video_link, college, year, message } = req.body;
  try {
    const affected = await testimonialModel.updateTestimonial(req.params.id, {
      name,
      video_link,
      college,
      year,
      message,
    });

    if (!affected) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Testimonial updated successfully' });
  } catch (err) {
    console.error('Error updating testimonial:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// DELETE /api/testimonials/:id
const deleteTestimonial = async (req, res) => {
  try {
    const affected = await testimonialModel.deleteTestimonial(req.params.id);
    if (!affected) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (err) {
    console.error('Error deleting testimonial:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
