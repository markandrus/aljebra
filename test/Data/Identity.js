'use strict';

var Identity = require('../../lib/index.js').Data.Identity,
    test = require('../test.js');

test({
  name: 'Identity',
  laws: ['Functor', 'Applicative', 'Monad'],
  constructors: [Identity],
  dictionary: Identity,
  equals: function(a, b) {
    return a.runIdentity() === b.runIdentity();
  }
});
