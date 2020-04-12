'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Points', 'author', 'sortingHatUserId')
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Points', 'sortingHatUserId', 'author')
  }
};
