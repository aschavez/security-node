'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [
      {
        id: 1,
        slug: 'user',
        name: 'Usuario',
        description: 'Usuario',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        id: 2,
        slug: 'admin',
        name: 'Administrador',
        description: 'Administrador de Sistema',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      }
    ], {});
  },
  down: function (queryInterface, Sequelize) {}
};
