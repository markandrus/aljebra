'use strict';

var Identity = require('../../lib/index.js').Data.Identity,
    ContT = require('../../lib/index.js').Trans.ContT(Identity),
    test = require('../test.js');

test({
  name: 'ContT Identity',
  laws: ['Functor', 'Applicative', 'Chain', 'Monad'],
  constructors: [ContT.of],
  dictionary: ContT,
  equals: function(done, a, b) {
    var results = [], n = 2;
    function callback(result) {
      // Meh, this is pointless.
      results.push(Identity.of(result));
      if (--n === 0)
        done(results[0].runIdentity() === results[1].runIdentity());
    }
    a.runContT(callback);
    b.runContT(callback);
  }
});
