var laws = require('../laws.js'),
    run = require('../../common/test.js').instance.run,
    Max = require('../../../index.js').Semigroup.instances.Max;

run(laws, {
  name: 'Max',
  domains: {'m a': [new Max(5), new Max(6), new Max(7)]},
  check: require('../../common/equality.js').simple
});
