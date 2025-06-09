module.exports = (sequelize, DataTypes) => {
  const categorizedImage = sequelize.define('categorizedImage', {
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    timestamps: false,
  });

  categorizedImage.associate = (models) => {
    categorizedImage.belongsTo(models.galleryCategory, {
      foreignKey: 'category_id',
      as: 'category',
      onDelete: 'CASCADE',
    });
  };

  return categorizedImage;
};
