'use strict';
const app = require('./server');
const serverless = require('serverless-http')

module.exports.nodeDemo = serverless(app);
