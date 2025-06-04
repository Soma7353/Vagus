const resultModel = require('../models/resultModel');

const getAllResults = async (req, res) => {
  try {
    const results = await resultModel.getAllResults();
    res.json(results);
  } catch (err) {
    console.error('Error fetching results:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createResult = async (req, res) => {
  const { name, rank, photo, college, year } = req.body;
  try {
    await resultModel.createResult({ name, rank, photo, college, year });
    res.status(201).json({ message: 'Result created successfully' });
  } catch (err) {
    console.error('Error creating result:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateResult = async (req, res) => {
  const { id } = req.params;
  const { name, rank, photo, college, year } = req.body;
  try {
    await resultModel.updateResult(id, { name, rank, photo, college, year });
    res.json({ message: 'Result updated successfully' });
  } catch (err) {
    console.error('Error updating result:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteResult = async (req, res) => {
  const { id } = req.params;
  try {
    await resultModel.deleteResult(id);
    res.json({ message: 'Result deleted successfully' });
  } catch (err) {
    console.error('Error deleting result:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllResults,
  createResult,
  updateResult,
  deleteResult,
};
