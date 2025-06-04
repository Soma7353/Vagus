const downloadModel = require('../models/downloadModel');

const getAllDownloads = async (req, res) => {
  try {
    const downloads = await downloadModel.getAllDownloads();
    res.json(downloads);
  } catch (err) {
    console.error('Error fetching downloads:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createDownload = async (req, res) => {
  const { name, file } = req.body;
  try {
    await downloadModel.createDownload({ name, file });
    res.status(201).json({ message: 'Download file created successfully' });
  } catch (err) {
    console.error('Error creating download:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateDownload = async (req, res) => {
  const { id } = req.params;
  const { name, file } = req.body;
  try {
    await downloadModel.updateDownload(id, { name, file });
    res.json({ message: 'Download file updated successfully' });
  } catch (err) {
    console.error('Error updating download:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteDownload = async (req, res) => {
  const { id } = req.params;
  try {
    await downloadModel.deleteDownload(id);
    res.json({ message: 'Download file deleted successfully' });
  } catch (err) {
    console.error('Error deleting download:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllDownloads,
  createDownload,
  updateDownload,
  deleteDownload,
};
