'use strict';

var Product = require('../../../lib/index.js').Data.Monoid.Product,
    test = require('../../test.js');

test({
  name: 'Product',
  laws: ['Semigroup', 'Monoid'],
  constructors: [Product],
  dictionary: Product,
  types: {
    a: Number
  },
  equals: function(a, b) {
    return a.getProduct() === b.getProduct();
  }
});
