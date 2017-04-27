'use strict';

var models = require('../models'),
    errors = require('restify-errors');

/* Collection of Roles */
exports.getRoles = function(req, res, next) {
  var params = req.pms;
  params.attributes = req.pms.attributes || {
    exclude: ['createdAt', 'updatedAt']
  };
  models.Role.findAndCountAll(params).then(function(result) {
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

/* Role resource */
exports.getRole = function(req, res, next) {
  var id = req.params.id,
      params = req.pms;
  models.Role.findById(id, params).then(function(result) {
    res.json(result);
  }).catch(function(err) {
    next(new errors.HTTPException(err, {
      statusCode: 404,
      message: 'Role not found'
    }));
  });
};

/* Role Creation */
exports.createRole = function(req, res, next) {
  var data = req.body;
  models.Role.create(data).then(function(result) {
    res.json(result.dataValues);
  }).catch(function(err) {
    next(new errors.HTTPException(err));
  });
};

/* Role update */
exports.updateRole = function(req, res, next) {
  var id = req.params.id;
  var data = req.body;
  models.Role.findById(id).then(function(result) {
    result.updateAttributes(data).then(function(result) {
      res.json(result.dataValues);
    }).catch(function(err) {
      next(new errors.HTTPException(err));
    });
  }).catch(function(err) {
    next(new errors.HTTPException(err, {
      statusCode: 404,
      message: 'Role not found'
    }));
  });
};

/* Role deletion */
exports.deleteRole = function(req, res, next) {
  var id = req.params.id;
  models.Role.destroy({
    where: { id: id }
  }).then(function(result) {
    res.json({
      deleted: result
    });
  }).catch(function(err) {
    next(new errors.HTTPException(err));
  });
};
