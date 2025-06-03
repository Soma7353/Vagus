const express = require('express');
const path = require('path');
require('dotenv').config();
const { Sequelize } = require('sequelize');
const app = require('./app');

// Static file hosting
const PORT = process.env.PORT || 5000;
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure Sequelize with SSL enabled for TiDB Serverless
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: 3306,
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true // Set to false if using self-signed certs (not recommended in prod)
    }
  },
  logging: false
});

// Sync database and start server
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});
