const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
require('dotenv').config();

const basename = path.basename(__filename);
const db = {};

// ✅ Use credentials from .env instead of URI
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql', // or 'postgres', 'sqlite', etc.
    logging: false,
  }
);

// ✅ Load and register all models
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file !== basename &&
      file.endsWith('.js')
    );
  })
  .forEach((file) => {
    const modelFunc = require(path.join(__dirname, file));
    const model = modelFunc(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// ✅ Call associate() if defined
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
