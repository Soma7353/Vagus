const Testimonial = require('../models/Testimonial');

exports.create = async (req, res) => {
  try {
    const testimonial = await Testimonial.create({
      name: req.body.name,
      message: req.body.message,
      image: req.file?.buffer,
      mimeType: req.file?.mimetype
    });
    res.status(201).json(testimonial);
  } catch (err) {
    res.status(500).json({ error: 'Create failed' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({
      attributes: ['id', 'name', 'message']
    });
    res.status(200).json(testimonials);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching' });
  }
};

exports.delete = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (!testimonial) return res.status(404).json({ error: 'Not found' });
    await testimonial.destroy();
    res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting' });
  }
};
