var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var instance = {
  name: 'Or',
  constructor: require('../../../lib/Semigroup.js').instances.Or,
  domain: [false, true],
  check: require('../../common/equality.js').simple
};

run(instance, laws);
