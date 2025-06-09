require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');
const imageGalleryRoutes = require('./routes/imageGalleryRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/gallery', imageGalleryRoutes);

db.sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
