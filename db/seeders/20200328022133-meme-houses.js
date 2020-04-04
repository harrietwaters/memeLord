'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('MemeHouses', [{
        id: 1,
        name: 'House Toblerone',
        houseImage: 'toblerone.jpeg'
      },{
        id: 2,
        name: 'House Dat Boi',
        houseImage: 'datBoi.jpeg'
      },{
        id: 3,
        name: 'House Harkonnen',
        houseImage: 'harkonnen.jpeg',
      },{
        id: 4,
        name: 'House uWu',
        houseImage: 'uwu.jpeg',
      }], {});
  },
  down: (queryInterface, Sequelize) => {
  }
};
