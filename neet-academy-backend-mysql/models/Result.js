const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Result = sequelize.define('Result', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  file: {
    type: DataTypes.BLOB('long'),
    allowNull: false
  },
  mimeType: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Result;