var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var Min         = require('../../../lib/Semigroup.js').instances.Min,
    OptionalMin = require('../../../lib/Monoid.js').constructors.OptionalMonoidFromSemigroup(Min);

var instance = {
  name: 'OptionalMonoidFromSemigroup',
  domains: {'m a': [new OptionalMin(), new OptionalMin(7), new OptionalMin(6)]},
  check: require('../../common/equality.js').simple
};

run(instance, laws);
