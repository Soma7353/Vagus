module.exports = (sequelize, DataTypes) => {
  const GalleryCategory = sequelize.define('GalleryCategory', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'gallery_categories',
    timestamps: false
  });

  // Association
  GalleryCategory.associate = (models) => {
    GalleryCategory.hasMany(models.CategorizedImage, {
      foreignKey: 'category_id',
      as: 'images'
    });
  };

  return GalleryCategory;
};
