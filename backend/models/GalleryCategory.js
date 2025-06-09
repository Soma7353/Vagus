module.exports = (sequelize, DataTypes) => {
  const galleryCategory = sequelize.define('galleryCategory', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  galleryCategory.associate = models => {
    galleryCategory.hasMany(models.categorizedImage, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE',
    });
  };

  return galleryCategory;
};