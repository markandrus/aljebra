var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var Last = require('../../../lib/Semigroup.js').instances.Last;

var instance = {
  name: 'Last',
  domains: {'m a': [new Last(7), new Last(6), new Last(5)]},
  check: require('../../common/equality.js').simple
};

run(instance, laws);
