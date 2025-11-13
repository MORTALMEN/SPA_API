// models/payment.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Payment', {
    PaymentID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    BookingID: DataTypes.INTEGER,
    PaymentDate: DataTypes.DATEONLY,
    Amount: DataTypes.DECIMAL(10,2),
    PaymentMethod: DataTypes.STRING(50)
  }, { tableName: 'Payments' });
};
