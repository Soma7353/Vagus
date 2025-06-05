const path = require('path');
const fs = require('fs');
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
      file: file.filename,
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

    let newFile = existing.file;
    let file_type = existing.file_type;

    if (file) {
      // Delete old file
      const oldPath = path.join(__dirname, '../uploads', existing.file);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }

      newFile = file.filename;
      file_type = path.extname(file.originalname).toLowerCase();
    }

    await downloadModel.updateDownload(id, {
      title,
      file: newFile,
      file_type,
    });

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

    const filePath = path.join(__dirname, '../uploads', existing.file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

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
