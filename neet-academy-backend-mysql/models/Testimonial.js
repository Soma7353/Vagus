const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Testimonial = sequelize.define('Testimonial', {
  name: DataTypes.STRING,
  college: DataTypes.STRING,
  message: DataTypes.TEXT,
  videoUrl: DataTypes.STRING,
});

module.exports = Testimonial;
