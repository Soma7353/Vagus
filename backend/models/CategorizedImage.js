// models/categorizedImage.js
module.exports = (sequelize, DataTypes) => {
  const CategorizedImage = sequelize.define('CategorizedImage', {
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    tableName: 'categorized_images',
    timestamps: false,
  });

  CategorizedImage.associate = (models) => {
    CategorizedImage.belongsTo(models.GalleryCategory, {
      foreignKey: 'category_id',
    });
  };

  return CategorizedImage;
};
