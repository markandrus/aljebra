var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var Min         = require('../../../lib/Semigroup.js').instances.Min,
    OptionalMin = require('../../../lib/Monoid.js').constructors.OptionalSemigroup(Min);

var instance = {
  name: 'OptionalSemigroup',
  domains: {'m a': [new OptionalMin(), new OptionalMin(new Min(7)), new OptionalMin(new Min(6))]},
  check: require('../../common/equality.js').simple
};

run(instance, laws);
