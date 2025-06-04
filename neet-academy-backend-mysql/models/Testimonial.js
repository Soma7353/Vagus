const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Testimonial = sequelize.define('Testimonial', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image: {
    type: DataTypes.BLOB('long'),
    allowNull: true
  },
  mimeType: {
    type: DataTypes.STRING,
    allowNull: true
  }
});