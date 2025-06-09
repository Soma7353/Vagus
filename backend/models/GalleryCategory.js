module.exports = (sequelize, DataTypes) => {
  const galleryCategory = sequelize.define('galleryCategory', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  galleryCategory.associate = (models) => {
    galleryCategory.hasMany(models.categorizedImage, {
      foreignKey: 'category_id',
      as: 'images',
      onDelete: 'CASCADE',
    });
  };

  return galleryCategory;
};
