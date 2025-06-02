const express = require('express');
const router = express.Router();
const { Testimonial } = require('../models');

// GET all
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({ order: [['createdAt', 'DESC']] });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// GET one
router.get('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (!testimonial) return res.status(404).json({ error: 'Testimonial not found' });
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching testimonial' });
  }
});

// POST create
router.post('/', async (req, res) => {
  try {
    const { name, college, message, videoUrl } = req.body;

    const testimonial = await Testimonial.create({ name, college, message, videoUrl });
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ error: 'Creation failed' });
  }
});

// PUT update
router.put('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (!testimonial) return res.status(404).json({ error: 'Testimonial not found' });

    const { name, college, message, videoUrl } = req.body;

    await testimonial.update({ name, college, message, videoUrl });
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (!testimonial) return res.status(404).json({ error: 'Testimonial not found' });

    await testimonial.destroy();
    res.json({ message: 'Testimonial deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
