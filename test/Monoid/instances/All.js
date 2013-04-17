var laws = require('../laws.js'),
    run = require('../../common/test.js').instance.run,
    All = require('../../../index.js').Monoid.instances.All;

run(laws, {
  name: 'All',
  domains: {'m a': [new All(false), new All(true)]},
  check: require('../../common/equality.js').simple
});
