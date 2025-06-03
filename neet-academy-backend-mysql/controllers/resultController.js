const Result = require('../models/Result');

exports.addResult = async (req, res) => {
  try {
    const { name, rank, college, year, color } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No photo uploaded' });
    }

    const result = await Result.create({
      name,
      rank,
      college,
      year,
      color,
      photo: req.file.buffer,           // store image buffer
      photoMimeType: req.file.mimetype, // store image mime type
    });

    res.status(201).json(result);
  } catch (err) {
    console.error('Add Result error:', err);
    res.status(500).json({ error: 'Failed to add result' });
  }
};

exports.getResults = async (req, res) => {
  try {
    const { year } = req.query;
    const where = year ? { year } : {};
    const results = await Result.findAll({
      where,
      attributes: { exclude: ['photo'] }, // exclude big blobs from list responses
    });
    res.json(results);
  } catch (err) {
    console.error('Get Results error:', err);
    res.status(500).json({ error: 'Failed to fetch results' });
  }
};

// New endpoint to get photo by result id
exports.getPhoto = async (req, res) => {
  try {
    const result = await Result.findByPk(req.params.id);
    if (!result || !result.photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }
    res.setHeader('Content-Type', result.photoMimeType);
    res.send(result.photo);
  } catch (err) {
    console.error('Get photo error:', err);
    res.status(500).json({ error: 'Failed to fetch photo' });
  }
};

exports.updateResult = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body };

    if (req.file) {
      updatedData.photo = req.file.buffer;
      updatedData.photoMimeType = req.file.mimetype;
    }

    const [updated] = await Result.update(updatedData, { where: { id } });

    if (!updated) return res.status(404).json({ error: 'Result not found' });

    const updatedResult = await Result.findByPk(id);
    res.json(updatedResult);
  } catch (err) {
    console.error('Update result error:', err);
    res.status(500).json({ error: 'Failed to update result' });
  }
};

exports.deleteResult = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Result.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Result not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('Delete result error:', err);
    res.status(500).json({ error: 'Failed to delete result' });
  }
};
