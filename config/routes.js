'use strict';

var controllers = require('../api/controllers'),
    config = require('../config'),
    checkScopes = require('../api/middlewares/security').checkScopes,
    checkRoles = require('../api/middlewares/security').checkRoles;

module.exports = function(server){
  /* Security */
  server.post({path: '/access_token/', version: config.app.version}, controllers.security.getAccessToken);
  /* User maintenance */
  server.get({path: '/users/', version: config.app.version}, checkScopes(['users:list']), controllers.user.getUsers);
  server.get({path: '/users/:id', version: config.app.version}, checkScopes(['users:get']), checkRoles(['admin']), controllers.user.getUser);
  server.post({path: '/users/', version: config.app.version}, checkScopes(['users:create']), controllers.user.createUser);
  server.put({path: '/users/:id', version: config.app.version}, checkScopes(['users:edit']), checkRoles(['admin']), controllers.user.updateUser);
  server.del({path: '/users/:id', version: config.app.version}, checkScopes(['users:delete']), controllers.user.deleteUser);
  /* Role maintenance */
  server.get({path: '/roles/', version: config.app.version}, checkScopes(['roles:list']), controllers.role.getRoles);
  server.get({path: '/roles/:id', version: config.app.version}, checkScopes(['roles:get']), controllers.role.getRole);
  server.post({path: '/roles/', version: config.app.version}, checkScopes(['roles:create']), controllers.role.createRole);
  server.put({path: '/roles/:id', version: config.app.version}, checkScopes(['roles:edit']), controllers.role.updateRole);
  server.del({path: '/roles/:id', version: config.app.version}, checkScopes(['roles:delete']), controllers.role.deleteRole);
  /* Permission maintenance */
  server.get({path: '/permissions/', version: config.app.version}, checkScopes(['permissions:list']), controllers.permission.getPermissions);
  server.get({path: '/permissions/:id', version: config.app.version}, checkScopes(['permissions:get']), controllers.permission.getPermission);
  server.post({path: '/permissions/', version: config.app.version}, checkScopes(['permissions:create']), controllers.permission.createPermission);
  server.put({path: '/permissions/:id', version: config.app.version}, checkScopes(['permissions:edit']), controllers.permission.updatePermission);
  server.del({path: '/permissions/:id', version: config.app.version}, checkScopes(['permissions:delete']), controllers.permission.deletePermission);
};
