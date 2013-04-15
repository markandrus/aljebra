var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var Any = require('../../../lib/Monoid.js').instances.Any;

var instance = {
  name: 'Any',
  domains: {'m a': [new Any(false), new Any(true)]},
  check: require('../../common/equality.js').simple
};

run(instance, laws);
