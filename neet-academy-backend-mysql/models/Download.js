const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Download = sequelize.define('Download', {
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

module.exports = Download;
