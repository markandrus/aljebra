var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var instance = {
  name: 'Product',
  constructor: require('../../../lib/Semigroup.js').instances.Product,
  domain: [0, 1, 2],
  check: require('../../common/equality.js').simple
};

run(instance, laws);
