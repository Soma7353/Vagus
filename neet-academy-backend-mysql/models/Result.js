const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Result = sequelize.define('Result', {
  name: DataTypes.STRING,
  rank: DataTypes.STRING,
  college: DataTypes.STRING,
  year: DataTypes.STRING,
  color: DataTypes.STRING,

  // Replace 'photo' string with actual image blob and mime type
  photoBlob: DataTypes.BLOB('long'),
  photoMimeType: DataTypes.STRING,
});

module.exports = Result;
