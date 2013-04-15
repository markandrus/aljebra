var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var instance = {
  name: 'Min',
  constructor: require('../../../lib/Semigroup.js').instances.Min,
  domain: [7, 6, 5],
  check: require('../../common/equality.js').simple
};

run(instance, laws);
