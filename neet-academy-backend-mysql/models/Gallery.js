const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Gallery = sequelize.define('Gallery', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileBlob: {
    type: DataTypes.BLOB('long'),
    allowNull: false,
  },
  mimeType: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Gallery;
