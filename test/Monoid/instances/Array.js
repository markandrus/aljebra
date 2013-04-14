var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var instance = {
  name: 'Array',
  constructor: require('../../../lib/Monoid.js').instances.Array,
  domain: [[1, 2], [3, 4]],
  check: require('../../common/equality.js').simple
};

run(instance, laws);
