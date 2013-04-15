var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var Min = require('../../../lib/Semigroup.js').instances.Min;

var instance = {
  name: 'Min',
  domains: {'m a': [new Min(7), new Min(6), new Min(5)]},
  check: require('../../common/equality.js').simple
};

run(instance, laws);
