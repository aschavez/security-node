'use strict';

var models = require('../models'),
    errors = require('restify-errors'),
    bcrypt = require('bcrypt-nodejs'),
    _ = require('lodash');

/* Collection of Users */
exports.getUsers = function(req, res, next) {
  var params = req.pms;
  params.attributes = (req.pms.attributes) ? _.without(req.pms.attributes, 'password') : { exclude: ['password', 'loginAttempts', 'createdAt', 'updatedAt'] };
  models.User.findAndCountAll(params).then(function(result) {
    var metadata = { count: result.count };
    if (params.offset) { metadata.offset = params.offset };
    if (params.limit) { metadata.limit = params.limit };
    res.json({
      metadata: metadata,
      response: result.rows
    });
  }).catch(function(err) {
    next(new errors.HTTPException(err));
  });
};

/* User resource */
exports.getUser = function(req, res, next) {
  var id = req.params.id,
      params = req.pms;
  params.attributes = (req.pms.attributes) ? _.without(req.pms.attributes, 'password') : { exclude: ['password'] };
  models.User.findById(id, params).then(function(result) {
    res.json(result);
  }).catch(function(err) {
    next(new errors.HTTPException(err, {
      statusCode: 404,
      message: 'User not found'
    }));
  });
};

/* User Creation */
exports.createUser = function(req, res, next) {
  var data = req.body;
  data.password = bcrypt.hashSync(data.password);
  models.User.create(data).then(function(result) {
    res.json(result.dataValues);
  }).catch(function(err) {
    next(new errors.HTTPException(err));
  });
};

/* User update */
exports.updateUser = function(req, res, next) {
  var id = req.params.id;
  var data = req.body;
  if(data.password) {
    data.password = bcrypt.hashSync(data.password);
  }
  models.User.findById(id).then(function(result) {
    result.updateAttributes(data).then(function(result) {
      res.json(result.dataValues);
    }).catch(function(err) {
      next(new errors.HTTPException(err));
    });
  }).catch(function(err) {
    next(new errors.HTTPException(err, {
      statusCode: 404,
      message: 'User not found'
    }));
  });
};

/* User deletion */
exports.deleteUser = function(req, res, next) {
  var id = req.params.id;
  models.User.destroy({
    where: { id: id }
  }).then(function(result) {
    res.json({
      deleted: result
    });
  }).catch(function(err) {
    next(new errors.HTTPException(err));
  });
};
