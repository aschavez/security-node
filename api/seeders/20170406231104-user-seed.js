'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        username: 'admin',
        firstName: 'Admin',
        email: 'admin@company.com',
        password: '$2a$10$ohcvWB.qlqkAA6sdXKRWVOKAIoTbXqklSqc55AwVpzSGqn1pTo36.',
        status: 'validated',
        roleId: 1,
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        id: 2,
        username: 'aschavez',
        firstName: 'Andrés',
        lastName: 'Chávez',
        email: 'achavez@rcp.pe',
        password: '$2a$10$ohcvWB.qlqkAA6sdXKRWVOKAIoTbXqklSqc55AwVpzSGqn1pTo36.',
        status: 'validated',
        roleId: 2,
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
    ], {});
  },
  down: function (queryInterface, Sequelize) {}
};
