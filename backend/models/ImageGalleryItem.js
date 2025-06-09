const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const GalleryCategory = require('./GalleryCategory');

const ImageGalleryItem = sequelize.define('ImageGalleryItem', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  categoryId: {
    type: DataTypes.INTEGER,
    references: { model: 'gallery_categoriess', key: 'id' },
    allowNull: false,
  },
  image: { type: DataTypes.TEXT('long'), allowNull: false }, // base64 string
}, {
  tableName: 'gallery_imagess',  // Keep table name same or rename if you want
  timestamps: false,
});

GalleryCategory.hasMany(ImageGalleryItem, { foreignKey: 'categoryId', as: 'images' });
ImageGalleryItem.belongsTo(GalleryCategory, { foreignKey: 'categoryId' });

module.exports = ImageGalleryItem;
