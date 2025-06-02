const { Result } = require('../models');

exports.addResult = async (req, res) => {
  try {
    const { name, rank, college, year, color } = req.body;
    const photo = `/uploads/${req.file.filename}`;
    const result = await Result.create({ name, rank, college, year, color, photo });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add result' });
  }
};

exports.getResults = async (req, res) => {
  try {
    const { year } = req.query;
    const where = year ? { year } : {};
    const results = await Result.findAll({ where });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch results' });
  }
};

exports.updateResult = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Result.update(req.body, { where: { id } });
    res.json({ updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update result' });
  }
};

exports.deleteResult = async (req, res) => {
  try {
    const { id } = req.params;
    await Result.destroy({ where: { id } });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete result' });
  }
};
