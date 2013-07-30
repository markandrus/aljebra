'use strict';

var Cont = require('../../lib/index.js').Data.Cont,
    test = require('../test.js');

test({
  name: 'Cont',
  laws: ['Functor', 'Applicative', 'Chain', 'Monad'],
  constructors: [Cont.of],
  dictionary: Cont,
  equals: function(done, a, b) {
    var results = [], n = 2;
    function callback(result) {
      results.push(result);
      if (--n === 0)
        done(results[0] === results[1]);
    }
    a.runCont(callback);
    b.runCont(callback);
  }
});
