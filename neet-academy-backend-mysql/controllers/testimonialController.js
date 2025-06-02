const { Testimonial } = require('../models');

exports.addTestimonial = async (req, res) => {
  try {
    const { name, college, message, videoUrl } = req.body;
    const t = await Testimonial.create({ name, college, message, videoUrl });
    res.status(201).json(t);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add testimonial' });
  }
};

exports.getTestimonials = async (req, res) => {
  try {
    const list = await Testimonial.findAll();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Testimonial.update(req.body, { where: { id } });
    res.json({ updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    await Testimonial.destroy({ where: { id } });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
};
