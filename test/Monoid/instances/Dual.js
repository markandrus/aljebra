var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var Monoid    = require('../../../index2.js').Monoid,
    Dual      = Monoid.constructors.Dual,
    Array     = Monoid.instances.Array,
    DualArray = new Dual(Array);

var instance = {
  name: 'Dual',
  domains: {'m a': [new DualArray([1, 2]), new DualArray([3, 4])]},
  check: require('../../common/equality.js').simple
};

run(instance, laws);
