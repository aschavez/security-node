'use strict';

var errors = require('restify-errors'),
    jwt = require('jsonwebtoken'),
    config = require('../../config'),
    models = require('../models'),
    _ = require('lodash');

exports.verifyToken = function(req, res, next) {
  var secureRoutes = ['/access_token/'];
  if(_.indexOf(secureRoutes, req.route.path) > -1) next();
  if(req.headers.authorization) {
    var token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, config.app.tokenSecret, function(err, payload) {
      if(err) {
        next(new errors.HTTPException({
          statusCode: 401,
          message: err.message,
          context: { userMessage: 'No se encuentra autorizado para esta acción.' }
        }));
      }
      req.authUser = payload.user;
      next();
    });
  } else {
    next(new errors.HTTPException({
      statusCode: 401,
      message: 'Authorization header not send',
      context: { userMessage: 'No se encuentra autorizado para esta acción.' }
    }));
  }
};

exports.checkScopes = function(requiredScopes) {
  return function(req, res, next) {
    if(!req.authUser) {
      next();
    } else {
      models.Role.findById(req.authUser.RoleId, {
        attributes: [],
        include: [{
          model: models.Permission,
          attributes: ['value'],
          through: { attributes: [] }
        }]
      })
        .then(function(role) {
          var userScopes = _.map(role.Permissions, function(perm) { return perm.value });
          if(_.difference(requiredScopes, userScopes).length === 0) {
            next();
          } else {
            next(new errors.HTTPException({
              statusCode: 403,
              message: 'Insufficient permissions',
              context: { userMessage: 'No se encuentra autorizado para esta acción.' }
            }));
          }
        })
        .catch(function(err) {
          next(new errors.HTTPException(err, {
            statusCode: 403,
            message: 'Role not found',
            context: { userMessage: 'No se encuentra autorizado para esta acción.' }
          }));
        });
    }
  };
};

exports.checkRoles = function(requiredRoles) {
  return function(req, res, next) {
    if(!req.authUser) {
      next();
    } else {
      models.Role.findById(req.authUser.RoleId, {
        attributes: ['id', 'slug']
      })
        .then(function(role) {
          if(_.indexOf(requiredRoles, role.slug) <= -1) {
            req.requiredUser = req.authUser.id;
          }
          next();
        })
        .catch(function(err) {
          next(new errors.HTTPException(err, {
            statusCode: 403,
            message: 'Role not found',
            context: { userMessage: 'No se encuentra autorizado para esta acción.' }
          }));
        });
    }
  };
};
