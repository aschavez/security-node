'use strict';

var models = require('../models'),
    errors = require('restify-errors'),
    bcrypt = require('bcrypt-nodejs'),
    jwt = require('jsonwebtoken'),
    config = require('../../config'),
    _ = require('lodash');

/* Access Token */
exports.getAccessToken = function(req, res, next) {
  var data = req.body;
  models.User.findOne({
    where: {
      username: data.username
    }
  })
    .then(function(user) {
      var isBlocked = user.blocked || false;
      if(!isBlocked) {
        if (bcrypt.compareSync(data.password, user.password)) {
          models.Role.findById(user.RoleId, {
            attributes: [],
            include: [{
              model: models.Permission,
              attributes: ['value'],
              through: { attributes: [] }
            }]
          })
            .then(function(role) {
              var userScopes = _.map(role.Permissions, function(perm) { return perm.value }),
                  timestamp = new Date().getTime(),
                  userData = _.pick(user, ['id', 'username', 'firstName', 'lastName', 'RoleId']),
                  tokenData = {
                    iss: 'dashboard',
                    user: userData,
                    scopes: userScopes,
                    iat: timestamp
                  },
                  token = jwt.sign(tokenData, config.app.tokenSecret, {
                    expiresIn: config.app.tokenExp
                  });
              res.json({
                token: token
              });
            });
        } else {
          next(new errors.HTTPException({
            statusCode: 401,
            message: 'Login failed',
            context: { userMessage: 'El usuario o la contraseña son incorrectos.' }
          }));
        }
      } else {
        next(new errors.HTTPException({
          statusCode: 401,
          message: 'User blocked',
          context: { userMessage: 'El usuario se encuentra actualmente bloqueado.' }
        }));
      }
    })
    .catch(function(err) {
      next(new errors.HTTPException(err, {
        statusCode: 401,
        message: 'User not found',
        context: { userMessage: 'El usuario o la contraseña son incorrectos.' }
      }));
    });
};
