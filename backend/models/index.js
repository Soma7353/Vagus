const { Sequelize, DataTypes } = require('sequelize');

// You can use your own DB connection config
const sequelize = new Sequelize('your_db_name', 'your_db_user', 'your_db_password', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define CategorizedImage model
const CategorizedImage = sequelize.define('CategorizedImage', {
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  photo: {
    type: DataTypes.BLOB('long'),
    allowNull: false,
  },
}, {
  tableName: 'categorized_images',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

// Define GalleryCategory model
const GalleryCategory = sequelize.define('GalleryCategory', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'gallery_categories',
  timestamps: false,
});

// Export all models and Sequelize connection
module.exports = {
  sequelize,
  Sequelize,
  CategorizedImage,
  GalleryCategory,
};
