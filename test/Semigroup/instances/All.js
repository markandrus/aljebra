var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var instance = {
  name: 'All',
  constructor: require('../../../lib/Semigroup.js').instances.All,
  domain: [false, true],
  check: require('../../common/equality.js').simple
};

run(instance, laws);
