'use strict';

var Any = require('../../../lib/index.js').Data.Monoid.Any,
    test = require('../../test.js');

test({
  name: 'Any',
  laws: ['Semigroup', 'Monoid'],
  constructors: [Any],
  dictionary: Any,
  types: {
    a: Boolean
  },
  equals: function(a, b) {
    return a.getAny() === b.getAny();
  }
});
