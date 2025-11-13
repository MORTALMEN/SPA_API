// models/booking.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Booking', {
    BookingID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ClientID: DataTypes.INTEGER,
    SpecialistID: DataTypes.INTEGER,
    ServiceID: DataTypes.INTEGER,
    BookingDate: DataTypes.DATEONLY,
    BookingTime: DataTypes.TIME,
    Status: DataTypes.STRING(50)
  }, { tableName: 'Bookings' });
};
