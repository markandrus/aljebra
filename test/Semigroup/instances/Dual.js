var laws = require('../laws.js'),
    run = require('../../common/test.js').instance.run,
    Semigroup = require('../../../index.js').Semigroup,
    Dual = Semigroup.constructors.Dual,
    First = Semigroup.instances.First,
    DualFirst = new Dual(First);

run(laws, {
  name: 'Dual',
  domains: {'m a': [new DualFirst(new First(1)), new DualFirst(new First(3))]},
  check: require('../../common/equality.js').simple
});
