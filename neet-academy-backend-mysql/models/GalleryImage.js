const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const GalleryImage = sequelize.define('GalleryImage', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.BLOB('long'),
    allowNull: false,
  },
  mimeType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = GalleryImage;
