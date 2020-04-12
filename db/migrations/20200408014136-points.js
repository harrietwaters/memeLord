'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Points', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false
      },
      messageId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      point: {
        type: Sequelize.INTEGER,
        defaultValue: () => Math.ceil(Math.random() * 1000),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        default: Date.now()
      },
      updatedAt: {
        type: Sequelize.DATE,
        default: Date.now()
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Points');
  }
};
