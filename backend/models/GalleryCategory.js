const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class GalleryCategory extends Model {
    static associate(models) {
      this.hasMany(models.CategorizedImage, {
        foreignKey: 'categoryId',
        as: 'images'
      });
    }
  }

  GalleryCategory.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { sequelize, modelName: 'GalleryCategory' }
  );

  return GalleryCategory;
};
