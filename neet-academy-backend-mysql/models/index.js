const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Result = require('./Result');
const GalleryImage = require('./GalleryImage');
const Testimonial = require('./Testimonial');

// Import and initialize the Download model
const DownloadModel = require('./Download');
const Download = DownloadModel(sequelize, DataTypes);

// Add syncDatabase utility
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // add { force: true } to drop/recreate tables
    console.log('MySQL synced successfully');
  } catch (err) {
    console.error('Failed to sync DB:', err);
  }
};

// Export all models and sequelize
module.exports = {
  sequelize,
  syncDatabase,
  Result,
  GalleryImage,
  Testimonial,
  Download, // ✅ make Download available for route files
};
