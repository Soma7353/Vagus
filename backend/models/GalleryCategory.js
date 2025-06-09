// models/galleryCategory.js
module.exports = (sequelize, DataTypes) => {
  const GalleryCategory = sequelize.define('GalleryCategory', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'gallery_categories',
    timestamps: false,
  });

  GalleryCategory.associate = (models) => {
    GalleryCategory.hasMany(models.CategorizedImage, {
      foreignKey: 'category_id',
    });
  };

  return GalleryCategory;
};
