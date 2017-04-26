'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Permissions', [
      {
        id: 1,
        slug: 'list_users',
        value: 'users.list',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        id: 2,
        slug: 'edit_users',
        value: 'users.edit',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        id: 3,
        slug: 'delete_users',
        value: 'users.delete',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        id: 4,
        slug: 'edit_profile',
        value: 'profile.edit',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        id: 5,
        slug: 'password_profile',
        value: 'profile.password',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
    ], {});
  },
  down: function (queryInterface, Sequelize) {}
};
