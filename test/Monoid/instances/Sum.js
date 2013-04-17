var laws = require('../laws.js'),
    run = require('../../common/test.js').instance.run,
    Sum = require('../../../index.js').Monoid.instances.Sum;

run(laws, {
  name: 'Sum',
  domains: {'m a': [new Sum(0), new Sum(1), new Sum(2)]},
  check: require('../../common/equality.js').simple
});
