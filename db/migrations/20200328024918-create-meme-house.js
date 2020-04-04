'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MemeHouses', {
      id: {
        field: 'id',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      houseImage: {
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
    return queryInterface.dropTable('MemeHouses');
  }
};