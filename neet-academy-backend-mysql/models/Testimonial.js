const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Testimonial = sequelize.define('Testimonial', {
  name: DataTypes.STRING,
  college: DataTypes.STRING,
  message: DataTypes.TEXT,
  videoUrl: DataTypes.STRING,
});

module.exports = Testimonial;
