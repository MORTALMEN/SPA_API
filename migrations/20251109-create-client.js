'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clients', {
      ClientID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      FirstName: Sequelize.STRING(100),
      LastName: Sequelize.STRING(100),
      Email: Sequelize.STRING(100),
      Phone: Sequelize.STRING(20),
      RegistrationDate: Sequelize.DATEONLY,
      username: { type: Sequelize.STRING(50), allowNull: false, unique: true },
      password: { type: Sequelize.STRING(255), allowNull: false, defaultValue: '' },
      role: { type: Sequelize.ENUM('admin','user'), allowNull: false, defaultValue: 'user' },
      user_id: { type: Sequelize.INTEGER }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Clients');
  }
};
