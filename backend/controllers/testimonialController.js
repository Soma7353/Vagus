// routes/testimonialRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer(); // for handling multipart/form-data

const {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonialController');

router.get('/api/testimonials', getAllTestimonials);
router.post('/api/testimonials', upload.none(), createTestimonial);
router.put('/api/testimonials/:id', upload.none(), updateTestimonial);
router.delete('/api/testimonials/:id', deleteTestimonial);

module.exports = router;


// controllers/testimonialController.js
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
  const { name = '', iframe = '', year = '' } = req.body || {};
  try {
    await testimonialModel.createTestimonial({ name, iframe, year });
    res.status(201).json({ message: 'Testimonial created successfully' });
  } catch (err) {
    console.error('Error creating testimonial:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateTestimonial = async (req, res) => {
  const { id } = req.params;
  const { name = '', iframe = '', year = '' } = req.body || {};
  try {
    await testimonialModel.updateTestimonial(id, { name, iframe, year });
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
