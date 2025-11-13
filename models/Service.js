// models/service.js

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Service', {
    ServiceID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ServiceName: DataTypes.STRING(100),
    Duration: DataTypes.INTEGER,
    Price: DataTypes.DECIMAL(10,2)
  }, { tableName: 'Services' });
};
