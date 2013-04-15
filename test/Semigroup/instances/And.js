var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var instance = {
  name: 'And',
  constructor: require('../../../lib/Semigroup.js').instances.And,
  domain: [false, true],
  check: require('../../common/equality.js').simple
};

run(instance, laws);
