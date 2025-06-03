const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Download = sequelize.define('Download', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filePath: { // ✅ MUST match the actual column name in DB
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Download;
