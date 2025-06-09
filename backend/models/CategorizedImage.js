module.exports = (sequelize, DataTypes) => {
  const categorizedImage = sequelize.define('categorizedImage', {
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caption: {
      type: DataTypes.STRING,
    },
  });

  categorizedImage.associate = models => {
    categorizedImage.belongsTo(models.galleryCategory, {
      foreignKey: 'categoryId',
    });
  };

  return categorizedImage;
};