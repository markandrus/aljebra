var laws = require('../laws.js'),
    run = require('../../common/test.js').instance.run,
    First = require('../../../index.js').Semigroup.instances.First;

run(laws, {
  name: 'First',
  domains: {'m a': [new First(7), new First(6), new First(5)]},
  check: require('../../common/equality.js').simple
});
