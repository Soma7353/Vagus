// models/Result.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Result = sequelize.define('Result', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  file: {
    type: DataTypes.BLOB('long'),
    allowNull: false
  },
  file_type: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'results',
  timestamps: false
});

module.exports = Result;
