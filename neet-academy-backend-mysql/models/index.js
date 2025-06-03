const { Sequelize, DataTypes } = require('sequelize');

// Adjust these values according to your actual DB config
const sequelize = new Sequelize(
  process.env.DB_NAME,     // e.g., 'your_db_name'
  process.env.DB_USER,     // e.g., 'root'
  process.env.DB_PASSWORD, // e.g., 'password'
  {
    host: process.env.DB_HOST || 'localhost',  // fallback for local dev
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // for Render/TiDB
      }
    }
  }
);

// ✅ Initialize models
const Result = require('./Result')(sequelize, DataTypes);
const GalleryImage = require('./GalleryImage')(sequelize, DataTypes);
const Testimonial = require('./Testimonial')(sequelize, DataTypes);
const Download = require('./Download')(sequelize, DataTypes);

// 🔁 Sync database
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // or { force: true } to drop & recreate tables
    console.log('✅ MySQL synced successfully');
  } catch (err) {
    console.error('❌ Failed to sync DB:', err.message);
  }
};

// 🚀 Export everything
module.exports = {
  sequelize,
  syncDatabase,
  Result,
  GalleryImage,
  Testimonial,
  Download
};
