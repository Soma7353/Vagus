module.exports = (sequelize, DataTypes) => {
  const Download = sequelize.define('Download', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Download;
};
