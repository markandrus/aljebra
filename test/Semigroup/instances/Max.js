var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var instance = {
  name: 'Max',
  constructor: require('../../../lib/Semigroup.js').instances.Max,
  domain: [5, 6, 7],
  check: require('../../common/equality.js').simple
};

run(instance, laws);
