require('dotenv').config();
const app = require('./app');
const { sequelize, syncDatabase } = require('./models');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');

    await syncDatabase(); // auto sync models
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('❌ Unable to start the server:', err);
    process.exit(1);
  }
};

startServer();
