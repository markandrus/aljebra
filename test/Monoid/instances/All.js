var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var All = require('../../../lib/Monoid.js').instances.All;

var instance = {
  name: 'All',
  domains: {'m a': [new All(false), new All(true)]},
  check: require('../../common/equality.js').simple
};

run(instance, laws);
