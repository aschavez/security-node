var _ = require('lodash');

module.exports = function(req, res, err) {
  /* Define base response */
  var response = {
    status: err.statusCode
  };
  /* Parse Sequelize errors */
  if (err.jse_cause) {
    response = parseSeqErr(err.jse_cause) || response;
  }
  /* Set response status code */
  res.statusCode = response.status;
  /* Verify additional info */
  if(err.message) {
    response.devMessage = err.message;
  }
  if (err.context) {
    if ('userMessage' in err.context) { response.userMessage = err.context.userMessage; }
    if ('errorCode' in err.context) { response.errorCode = err.context.errorCode; }
    if ('moreInfo' in err.context) { response.moreInfo = err.context.moreInfo; }
  }
  /* Response */
  res.send(response);
};

/* Parse Sequelize errors */
var parseSeqErr = function(error) {
  switch(error.name) {
    /* Database Error */
    case 'SequelizeDatabaseError':
      switch(error.original.code) {
        case 'ER_PARSE_ERROR':
        case 'ER_BAD_FIELD_ERROR':
          return {
            status: 400,
            devMessage: 'Unknown or bad field use in query parameters'
          }
          break;
      }
      break;
    /* Unique Constraint Error */
    case 'SequelizeUniqueConstraintError':
      var moreInfo = [];
      _.map(error.errors, function(err) {
        moreInfo.push({
          message: err.message,
          value: err.value
        });
      });
      var userInfo = {
        message: 'Ya existe un registro con ese {{field}}, por favor elija otro.',
        field: error.errors[0].path
      };
      return {
        status: 400,
        userMessage: userInfo,
        devMessage: 'Schema validation error',
        moreInfo: moreInfo
      }
      break;
    case 'SequelizeForeignKeyConstraintError':
      return {
        status: 409,
        userMessage: 'No se puede eliminar, porque existen registros que dependen de este.',
        devMessage: 'Cannot delete or update a parent row: a foreign key constraint fails',
        moreInfo: error.message
      }
      break;
    /* Validation Error */
    case 'SequelizeValidationError':
      var moreInfo = [];
      _.map(error.errors, function(err) {
        moreInfo.push({
          message: err.message,
          value: err.value
        });
      });
      return {
        status: 400,
        devMessage: 'Schema validation error',
        moreInfo: moreInfo
      }
      break;
  }


};
