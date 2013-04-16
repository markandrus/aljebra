var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var Max = require('../../../lib2/Semigroup.js').instances.Max;

var instance = {
  name: 'Max',
  domains: {'m a': [new Max(5), new Max(6), new Max(7)]},
  check: require('../../common/equality.js').simple
};

run(instance, laws);
