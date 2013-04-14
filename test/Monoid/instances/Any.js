var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var instance = {
  name: 'Any',
  constructor: require('../../../lib/Monoid.js').instances.Any,
  domain: [false, true],
  check: require('../../common/equality.js').simple
};

run(instance, laws);
