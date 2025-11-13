// app.js
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { sequelize } = require('./config/db');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api', apiRoutes);

// health
app.get('/', (req, res) => res.json({ ok: true, env: process.env.NODE_ENV || 'development' }));

// start
(async () => {
  try {
    await sequelize.authenticate();
    console.log('🔌 DB connected');
    // don't auto-sync in production — uncomment only for development if you want to sync models:
    // await sequelize.sync({ alter: false });
    app.listen(PORT, () => console.log(`🚀 Server listening on http://localhost:${PORT}`));
  } catch (err) {
    console.error('DB connection error', err);
    process.exit(1);
  }
})();
