'use strict';

var Maybe = require('../../lib/index.js').Data.Maybe,
    test = require('../test.js');

test({
  name: 'Maybe',
  laws: ['Functor', 'Applicative', 'Chain', 'Monad'],
  constructors: [Maybe.Just, Maybe.Nothing],
  dictionary: Maybe,
  equals: function(a, b) {
    return a.isJust() && b.isJust() && a.fromJust() === b.fromJust() ||
           a.isNothing() && b.isNothing();
  }
});
