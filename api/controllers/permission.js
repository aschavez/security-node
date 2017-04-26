'use strict';

var models = require('../models'),
    errors = require('restify-errors');

/* Collection of Permissions */
exports.getPermissions = function(req, res, next) {
  var params = req.pms;
  params.attributes = req.pms.attributes || {
    exclude: ['createdAt', 'updatedAt']
  };
  models.Permission.findAndCountAll(params).then(function(result) {
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

/* Permission resource */
exports.getPermission = function(req, res, next) {
  var id = req.params.id,
      params = req.pms;
  models.Permission.findById(id, params).then(function(result) {
    res.json(result);
  }).catch(function(err) {
    next(new errors.HTTPException(err, {
      statusCode: 404,
      message: 'Permission not found'
    }));
  });
};

/* Permission Creation */
exports.createPermission = function(req, res, next) {
  var data = req.body;
  models.Permission.create(data).then(function(result) {
    res.json(result.dataValues);
  }).catch(function(err) {
    next(new errors.HTTPException(err));
  });
};

/* Permission update */
exports.updatePermission = function(req, res, next) {
  var id = req.params.id;
  var data = req.body;
  models.Permission.findById(id).then(function(result) {
    result.updateAttributes(data).then(function(result) {
      res.json(result.dataValues);
    }).catch(function(err) {
      next(new errors.HTTPException(err));
    });
  }).catch(function(err) {
    next(new errors.HTTPException(err, {
      statusCode: 404,
      message: 'Permission not found'
    }));
  });
};

/* Permission deletion */
exports.deletePermission = function(req, res, next) {
  var id = req.params.id;
  models.Permission.destroy({
    where: { id: id }
  }).then(function(result) {
    res.json({
      deleted: result
    });
  }).catch(function(err) {
    next(new errors.HTTPException(err));
  });
};
