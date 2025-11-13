// models/client.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Client', {
    ClientID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    FirstName: DataTypes.STRING(100),
    LastName: DataTypes.STRING(100),
    Email: DataTypes.STRING(100),
    Phone: DataTypes.STRING(20),
    RegistrationDate: DataTypes.DATEONLY,
    username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: false, defaultValue: '' },
    role: { type: DataTypes.ENUM('admin','user'), allowNull: false, defaultValue: 'user' },
    user_id: DataTypes.INTEGER
  }, { tableName: 'Clients' });
};
