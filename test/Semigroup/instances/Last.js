var laws = require('../laws.js'),
    run = require('../../common/test.js').instance.run,
    Last = require('../../../index.js').Semigroup.instances.Last;

run(laws, {
  name: 'Last',
  domains: {'m a': [new Last(7), new Last(6), new Last(5)]},
  check: require('../../common/equality.js').simple
});
