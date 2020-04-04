'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SortingHatUsers', {
      author: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      lastHatTime: {
        type: Sequelize.INTEGER,
        defaultValue: () => Date.now(),
        allowNull: false
      },
      memeHouseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'MemeHouses',
          },
          key: 'id'
        }
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
    return queryInterface.dropTable('SortingHatUsers');
  }
};