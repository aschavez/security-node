'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Permissions', [
      {
        id: 1,
        slug: 'list_users',
        value: 'users:list',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        id: 2,
        slug: 'get_users',
        value: 'users:get',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        id: 3,
        slug: 'create_users',
        value: 'users:create',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        id: 4,
        slug: 'edit_users',
        value: 'users:edit',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        id: 5,
        slug: 'delete_users',
        value: 'users:delete',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        id: 6,
        slug: 'list_roles',
        value: 'roles:list',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        id: 7,
        slug: 'get_roles',
        value: 'roles:get',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        id: 8,
        slug: 'create_roles',
        value: 'roles:create',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        id: 9,
        slug: 'edit_roles',
        value: 'roles:edit',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        id: 10,
        slug: 'delete_roles',
        value: 'roles:delete',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        id: 11,
        slug: 'list_permissions',
        value: 'permissions:list',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        id: 12,
        slug: 'get_permissions',
        value: 'permissions:get',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        id: 13,
        slug: 'create_permissions',
        value: 'permissions:create',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        id: 14,
        slug: 'edit_permissions',
        value: 'permissions:edit',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        id: 15,
        slug: 'delete_permissions',
        value: 'permissions:delete',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        id: 16,
        slug: 'edit_profile',
        value: 'profile:edit',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        id: 17,
        slug: 'password_profile',
        value: 'profile:password',
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      }
    ], {});
  },
  down: function (queryInterface, Sequelize) {}
};
