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
  },
  /* NOTE: This is unnecessary for the types of Cont written so far, but when we
     get to Node callbacks, it will be useful. */
  cont: function(a, b, complete, error) {
    var counter = 2,
        results = [];
    function callback(a) {
      counter--;
      results.push(a);
      if (counter === 0) {
        if (JSON.stringify(results[0]) === JSON.stringify(results[1]))
          complete();
        else
          error(instance);
      }
    }
    a.next(callback);
    b.next(callback);
  }
};
