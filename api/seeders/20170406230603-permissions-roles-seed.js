'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('PermissionsRoles', [
      {
        roleId: 1,
        permissionId: 4,
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        roleId: 1,
        permissionId: 5,
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        roleId: 2,
        permissionId: 1,
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        roleId: 2,
        permissionId: 2,
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      },
      {
        roleId: 2,
        permissionId: 3,
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {}
};
