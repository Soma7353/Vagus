const express = require('express');
const app = require('./app');
const path = require('path');
require('dotenv').config();
const { sequelize } = require('./models');

const PORT = process.env.PORT || 5000;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
