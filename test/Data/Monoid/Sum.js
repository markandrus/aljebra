'use strict';

var Sum = require('../../../lib/index.js').Data.Monoid.Sum,
    test = require('../../test.js');

test({
  name: 'Sum',
  laws: ['Semigroup', 'Monoid'],
  constructors: [Sum],
  dictionary: Sum,
  types: {
    a: Number
  },
  equals: function(a, b) {
    return a.getSum() === b.getSum();
  }
});
