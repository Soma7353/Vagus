// models/index.js
const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

// Load all models
const Result = require('./Result');
const GalleryImage = require('./GalleryImage');
const Testimonial = require('./Testimonial');
const Download = require('./Download');

// Add syncDatabase utility
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // use { alter: true } or { force: true } as needed
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
  Download,
};
