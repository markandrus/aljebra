'use strict';

var Identity = require('../../lib/index.js').Data.Identity,
    Free = require('../../lib/index.js').Data.Free, // (Identity),
    test = require('../test.js');

test({
  name: 'Free Identity',
  laws: ['Functor', 'Applicative', 'Chain', 'Monad'],
  constructors: [Free.of],
  dictionary: Free,
  equals: function(a, b) {
    function check(a, b) {
      return a.isPure() && b.isPure() && a.fromPure() == b.fromPure()
          || a.isFree() && b.isFree() && check(a.fromFree(), b.fromFree());
    }
    return check(a, b);
  }
});
