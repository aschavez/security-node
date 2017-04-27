'use strict';

module.exports = {
  name: process.env.APPNAME || 'API Rest',
  port: process.env.PORT || 8011,
  version: process.env.APPVERSION || '1.0.0',
  env: process.env.NODE_ENV || 'development',
  pageLimit: process.env.PAGE_LIMIT || 10,
  tokenSecret: process.env.TOKEN_SECRET || 'bpvr7i743f7JkM7a6ZUCWEGNU3HL353N',
  tokenExp: process.env.TOKEN_EXP || '1d'
};
