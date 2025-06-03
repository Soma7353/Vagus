module.exports = (sequelize, DataTypes) => {
  const GalleryImage = sequelize.define('GalleryImage', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return GalleryImage;
};
