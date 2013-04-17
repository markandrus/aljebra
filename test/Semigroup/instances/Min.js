var laws = require('../laws.js'),
    run = require('../../common/test.js').instance.run,
    Min = require('../../../index.js').Semigroup.instances.Min;

run(laws, {
  name: 'Min',
  domains: {'m a': [new Min(7), new Min(6), new Min(5)]},
  check: require('../../common/equality.js').simple
});
