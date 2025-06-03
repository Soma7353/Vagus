const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const GalleryImage = sequelize.define('GalleryImage', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = GalleryImage;