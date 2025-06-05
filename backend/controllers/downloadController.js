const path = require('path');
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
  try {
    const { title } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'File is required' });
    }

    const file_type = path.extname(file.originalname).toLowerCase();

    await downloadModel.createDownload({
      title,
      file: file.buffer, // Use buffer instead of filename
      file_type,
    });

    res.status(201).json({ message: 'Download file created successfully' });
  } catch (err) {
    console.error('Error creating download:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateDownload = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const file = req.file;

    const existing = await downloadModel.getDownloadById(id);
    if (!existing) {
      return res.status(404).json({ error: 'Download not found' });
    }

    const fileData = {
      title,
      file: file ? file.buffer : existing.file,
      file_type: file ? path.extname(file.originalname).toLowerCase() : existing.file_type
    };

    await downloadModel.updateDownload(id, fileData);
    res.json({ message: 'Download file updated successfully' });
  } catch (err) {
    console.error('Error updating download:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteDownload = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await downloadModel.getDownloadById(id);
    if (!existing) {
      return res.status(404).json({ error: 'Download not found' });
    }

    await downloadModel.deleteDownload(id);
    res.json({ message: 'Download file deleted successfully' });
  } catch (err) {
    console.error('Error deleting download:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Optional: To serve file from DB
const downloadFile = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await downloadModel.getDownloadById(id);

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.setHeader('Content-Disposition', `attachment; filename="${file.title}${file.file_type}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(file.file);
  } catch (err) {
    console.error('Error sending file:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllDownloads,
  createDownload,
  updateDownload,
  deleteDownload,
  downloadFile, // Export if you use it in routes
};
