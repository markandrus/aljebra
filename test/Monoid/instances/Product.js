var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var Product = require('../../../index2.js').Monoid.instances.Product;

var instance = {
  name: 'Product',
  domains: {'m a': [new Product(0), new Product(1), new Product(2)]},
  check: require('../../common/equality.js').simple
};

run(instance, laws);
