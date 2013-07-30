'use strict';

var All = require('../../../lib/index.js').Data.Monoid.All,
    test = require('../../test.js');

test({
  name: 'All',
  laws: ['Semigroup', 'Monoid'],
  constructors: [All],
  dictionary: All,
  types: {
    a: Boolean
  },
  equals: function(a, b) {
    return a.getAll() === b.getAll();
  }
});
