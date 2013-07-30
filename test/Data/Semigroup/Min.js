'use strict';

var Min = require('../../../lib/index.js').Data.Semigroup.Min,
    test = require('../../test.js');

test({
  name: 'Min',
  laws: ['Semigroup'],
  constructors: [Min],
  dictionary: Min,
  types: {
    a: Number
  },
  equals: function(a, b) {
    return a.getMin() === b.getMin();
  }
});
