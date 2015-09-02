var lodash = require('lodash');

var helpers = {

  eyes: require('eyes').inspector({ maxlength: -1 }),

  Promise: require('bluebird'),

  YAML: require('yamljs'),

  cwd: process.cwd(),

  env: process.env,

  _: lodash

};


global = lodash.assign(global, helpers);

