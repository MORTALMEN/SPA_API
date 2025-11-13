// models/specialist.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Specialist', {
    SpecialistID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    FirstName: DataTypes.STRING(100),
    LastName: DataTypes.STRING(100),
    Specialty: DataTypes.STRING(100),
    Phone: DataTypes.STRING(20),
    HireDate: DataTypes.DATEONLY
  }, { tableName: 'Specialists' });
};
