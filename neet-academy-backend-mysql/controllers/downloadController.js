const Download = require('../models/Download');

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const file = await Download.create({
      title: req.body.title,
      file: req.file.buffer,
      mimeType: req.file.mimetype,
    });

    res.status(201).json(file);
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const items = await Download.findAll({ attributes: ['id', 'title'] });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: 'Fetch failed' });
  }
};

exports.getById = async (req, res) => {
  try {
    const file = await Download.findByPk(req.params.id);
    if (!file) return res.status(404).json({ error: 'Not found' });

    res.setHeader('Content-Type', file.mimeType);
    res.send(file.file);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching file' });
  }
};

exports.delete = async (req, res) => {
  try {
    const file = await Download.findByPk(req.params.id);
    if (!file) return res.status(404).json({ error: 'Not found' });
    await file.destroy();
    res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
};