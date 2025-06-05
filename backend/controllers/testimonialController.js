const Testimonial = require('../models/testimonialModel');

exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll();
    res.json(testimonials);
  } catch (err) {
    console.error('Error getting testimonials:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createTestimonial = async (req, res) => {
  try {
    const { name, message, video_link } = req.body;
    await Testimonial.create({ name, message, video_link });
    res.status(201).json({ message: 'Testimonial created' });
  } catch (err) {
    console.error('Error creating testimonial:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, message, video_link } = req.body;
    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) return res.status(404).json({ error: 'Testimonial not found' });

    await testimonial.update({ name, message, video_link });
    res.json({ message: 'Testimonial updated' });
  } catch (err) {
    console.error('Error updating testimonial:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) return res.status(404).json({ error: 'Testimonial not found' });

    await testimonial.destroy();
    res.json({ message: 'Testimonial deleted' });
  } catch (err) {
    console.error('Error deleting testimonial:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
