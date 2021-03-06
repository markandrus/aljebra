'use strict';

var laws = require('../laws.js'),
    run = require('../../common/test.js').instance.run,
    Monoid = require('../../../index.js').Monoid,
    Dual = Monoid.constructors.Dual,
    Array = Monoid.instances.Array,
    DualArray = new Dual(Array);

run(laws, {
  name: 'Dual',
  domains: {'m a': [new DualArray(new Array([1, 2])), new DualArray(new Array([3, 4]))]},
  check: require('../../common/equality.js').simple
});
