const Download = require('../models/Download');

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const file = await Download.create({
      title: req.body.title,
      filePath: `/uploads/downloads/${req.file.filename}`,
    });

    res.status(201).json(file);
  } catch (err) {
    console.error('Download upload error:', err);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};

exports.getAllDownloads = async (req, res) => {
  try {
    const files = await Download.findAll();
    res.status(200).json(files);
  } catch (err) {
    console.error('Download fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch downloads' });
  }
};

exports.deleteDownload = async (req, res) => {
  try {
    const file = await Download.findByPk(req.params.id);
    if (!file) return res.status(404).json({ error: 'File not found' });

    await file.destroy();
    res.status(200).json({ message: 'File deleted' });
  } catch (err) {
    console.error('Download delete error:', err);
    res.status(500).json({ error: 'Failed to delete file' });
  }
};

exports.updateDownload = async (req, res) => {
  try {
    const file = await Download.findByPk(req.params.id);
    if (!file) return res.status(404).json({ error: 'File not found' });

    const updatedData = {
      title: req.body.title || file.title,
    };

    if (req.file) {
      updatedData.filePath = `/uploads/downloads/${req.file.filename}`;
    }

    await file.update(updatedData);
    res.status(200).json(file);
  } catch (err) {
    console.error('Download update error:', err);
    res.status(500).json({ error: 'Failed to update file' });
  }
};
