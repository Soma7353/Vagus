const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.GalleryCategory = require('./GalleryCategory')(sequelize, DataTypes);
db.CategorizedImage = require('./CategorizedImage')(sequelize, DataTypes);

// Associations
db.GalleryCategory.hasMany(db.CategorizedImage, { foreignKey: 'category_id' });
db.CategorizedImage.belongsTo(db.GalleryCategory, { foreignKey: 'category_id' });

module.exports = db;
