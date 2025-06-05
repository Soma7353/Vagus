const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Testimonial = sequelize.define('Testimonial', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  video_link: {
    type: DataTypes.STRING,
    allowNull: true, // Optional video link
  },
}, {
  tableName: 'testimonials',
  timestamps: true,
});

module.exports = Testimonial;
