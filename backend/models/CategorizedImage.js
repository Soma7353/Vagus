const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class CategorizedImage extends Model {
    static associate(models) {
      this.belongsTo(models.GalleryCategory, {
        foreignKey: 'categoryId',
        as: 'category',
      });
    }
  }

  CategorizedImage.init(
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'CategorizedImage',
    }
  );

  return CategorizedImage;
};
