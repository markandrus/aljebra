'use strict';

var Max = require('../../../lib/index.js').Data.Semigroup.Max,
    test = require('../../test.js');

test({
  name: 'Max',
  laws: ['Semigroup'],
  constructors: [Max],
  dictionary: Max,
  types: {
    a: Number
  },
  equals: function(a, b) {
    return a.getMax() === b.getMax();
  }
});
