// models/index.js
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
require('dotenv').config();

const db = {};
const sequelize = new Sequelize(
  process.env.DB_NAME || 'SPA',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: false,
    define: { timestamps: false }
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// import models
db.User = require('./user')(sequelize, Sequelize);
db.Client = require('./client')(sequelize, Sequelize);
db.Specialist = require('./specialist')(sequelize, Sequelize);
db.Service = require('./service')(sequelize, Sequelize);
db.Booking = require('./booking')(sequelize, Sequelize);
db.Payment = require('./payment')(sequelize, Sequelize);

// associations
db.Client.belongsTo(db.User, { foreignKey: 'user_id', as: 'user' });
db.User.hasOne(db.Client, { foreignKey: 'user_id', as: 'client' });

db.Booking.belongsTo(db.Client, { foreignKey: 'ClientID', as: 'client' });
db.Booking.belongsTo(db.Specialist, { foreignKey: 'SpecialistID', as: 'specialist' });
db.Booking.belongsTo(db.Service, { foreignKey: 'ServiceID', as: 'service' });

db.Payment.belongsTo(db.Booking, { foreignKey: 'BookingID', as: 'booking' });
db.Booking.hasMany(db.Payment, { foreignKey: 'BookingID', as: 'payments' });

module.exports = db;
