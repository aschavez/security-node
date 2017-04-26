'use strict';

var controllers = require('../api/controllers'),
    config = require('../config');

module.exports = function(server){
  /* Security */
  server.post({path: '/access_token/', version: config.app.version}, controllers.security.getAccessToken);
  /* User maintenance */
  server.get({path: '/users/', version: config.app.version}, controllers.user.getUsers);
  server.get({path: '/users/:id', version: config.app.version}, controllers.user.getUser);
  server.post({path: '/users/', version: config.app.version}, controllers.user.createUser);
  server.put({path: '/users/:id', version: config.app.version}, controllers.user.updateUser);
  server.del({path: '/users/:id', version: config.app.version}, controllers.user.deleteUser);
  /* Role maintenance */
  server.get({path: '/roles/', version: config.app.version}, controllers.role.getRoles);
  server.get({path: '/roles/:id', version: config.app.version}, controllers.role.getRole);
  server.post({path: '/roles/', version: config.app.version}, controllers.role.createRole);
  server.put({path: '/roles/:id', version: config.app.version}, controllers.role.updateRole);
  server.del({path: '/roles/:id', version: config.app.version}, controllers.role.deleteRole);
  /* Permission maintenance */
  server.get({path: '/permissions/', version: config.app.version}, controllers.permission.getPermissions);
  server.get({path: '/permissions/:id', version: config.app.version}, controllers.permission.getPermission);
  server.post({path: '/permissions/', version: config.app.version}, controllers.permission.createPermission);
  server.put({path: '/permissions/:id', version: config.app.version}, controllers.permission.updatePermission);
  server.del({path: '/permissions/:id', version: config.app.version}, controllers.permission.deletePermission);
};
