// models/CategorizedImage.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('CategorizedImage', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'gallery_categories',
        key: 'id'
      }
    },
    photo: {
      type: DataTypes.BLOB('long'),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'categorized_images',
    timestamps: false
  });
};
