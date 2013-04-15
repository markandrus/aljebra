var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var Sum = require('../../../lib/Monoid.js').instances.Sum;

var instance = {
  name: 'Sum',
  domains: {'m a': [new Sum(0), new Sum(1), new Sum(2)]},
  check: require('../../common/equality.js').simple
};

run(instance, laws);
