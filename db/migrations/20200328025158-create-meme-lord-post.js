'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MemeLordPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      command: {
        type: Sequelize.STRING,
        allowNull: false
      },
      triggerMessage: {
        type: Sequelize.STRING,
        allowNull: false
      },
      triggerResponse: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dateTime: {
        type: Sequelize.INTEGER,
        defaultValue: () => Date.now(),
        allowNull: false
      },
      attachmentUrl: {
        type: Sequelize.STRING,
        allowNull: false
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
    return queryInterface.dropTable('MemeLordPosts');
  }
};