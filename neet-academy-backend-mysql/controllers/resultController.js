const Result = require('../models/Result');

exports.upload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const result = await Result.create({
      title: req.body.title,
      file: req.file.buffer,
      mimeType: req.file.mimetype,
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Upload failed' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const results = await Result.findAll({ attributes: ['id', 'title'] });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
};

exports.getFile = async (req, res) => {
  try {
    const result = await Result.findByPk(req.params.id);
    if (!result) return res.status(404).json({ error: 'Not found' });
    res.setHeader('Content-Type', result.mimeType);
    res.send(result.file);
  } catch (err) {
    res.status(500).json({ error: 'Error' });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await Result.findByPk(req.params.id);
    if (!result) return res.status(404).json({ error: 'Not found' });
    await result.destroy();
    res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting' });
  }
};