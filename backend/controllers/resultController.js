const path = require('path');
const Result = require('../models/Result');

// GET all results
exports.getAllResults = async (_req, res) => {
  try {
    const items = await Result.findAll({ attributes: ['id', 'title'] });
    res.json(items);
  } catch (err) {
    console.error('Error fetching results:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET result file (force download)
exports.downloadResult = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Result.findByPk(id);
    if (!item) return res.status(404).send('Result not found');

    res.setHeader('Content-Disposition', `attachment; filename="${item.title}${item.file_type}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(item.file);
  } catch (err) {
    console.error('Error downloading result:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST create new result
exports.createResult = async (req, res) => {
  try {
    const { title } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: 'File is required' });

    const file_type = path.extname(file.originalname).toLowerCase();

    await Result.create({
      title,
      file: file.buffer,
      file_type
    });

    res.status(201).json({ message: 'Result created successfully' });
  } catch (err) {
    console.error('Error creating result:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// PUT update result
exports.updateResult = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const file = req.file;

    const item = await Result.findByPk(id);
    if (!item) return res.status(404).json({ error: 'Result not found' });

    item.title = title || item.title;
    if (file) {
      item.file = file.buffer;
      item.file_type = path.extname(file.originalname).toLowerCase();
    }

    await item.save();
    res.json({ message: 'Result updated successfully' });
  } catch (err) {
    console.error('Error updating result:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// DELETE result
exports.deleteResult = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Result.destroy({ where: { id } });

    if (!deleted) return res.status(404).send('Not found');

    res.json({ message: 'Result deleted successfully' });
  } catch (err) {
    console.error('Error deleting result:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
