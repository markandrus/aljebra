'use strict';

module.exports = {
  simple: function(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  },
  verbose: function(a, b) {
    var simple = require('../../common/equality.js').simple,
        util = require('util');
    console.log('Result');
    console.log(util.inspect(a));
    console.log(util.inspect(b));
    console.log();
    return JSON.stringify(a) === JSON.stringify(b);
  }
};
