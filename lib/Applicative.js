'use strict';

var req = require('./common.js').req,
    instances = require('./Monad.js').instances;

for (var name in instances)
  instances[name].prototype.ap = function(b) {
    req.exactly(1, arguments)
       .instance(b, this.constructor);
    return this.chain(function(f) {
      req.exactly(1, arguments)
         .type('function', f);
      return b.map(f);
    });
  };

module.exports = {
  instances: instances
};
