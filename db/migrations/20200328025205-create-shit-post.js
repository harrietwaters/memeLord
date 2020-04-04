'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ShitPosts', {
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
      messageContent: {
        type: Sequelize.STRING
      },
      dateTime: {
        type: Sequelize.INTEGER,
        defaultValue: () => Date.now(),
        allowNull: false
      },
      imageHash: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        default: Date.now()
      },
      updatedAt: {
        type: Sequelize.DATE,
        default: Date.now()
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ShitPosts');
  }
};