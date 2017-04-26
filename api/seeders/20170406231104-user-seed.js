'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        username: 'admin',
        firstName: 'Admin',
        email: 'admin@company.com',
        password: '123',
        status: 'validated',
        roleId: 2,
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      }
    ], {});
  },
  down: function (queryInterface, Sequelize) {}
};
