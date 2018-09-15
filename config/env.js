'use strict';
var time = new Date().getTime();

module.exports = {
  local: {
    NODE_ENV: '"local"',
    VERSION: 0
  },
  develop: {
    NODE_ENV: '"develop"',
    VERSION: 0
  },
  test: {
    NODE_ENV: '"test"',
    VERSION: time
  },
  production: {
    NODE_ENV: '"production"',
    VERSION: time
  },
  mock: {
    NODE_ENV: '"mock"'
  }
};
