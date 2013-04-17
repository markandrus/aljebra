var laws = require('../laws.js'),
    run = require('../../common/test.js').instance.run,
    Any = require('../../../index.js').Monoid.instances.Any;

run(laws, {
  name: 'Any',
  domains: {'m a': [new Any(false), new Any(true)]},
  check: require('../../common/equality.js').simple
});
