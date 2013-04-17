'use strict';

var laws = require('../laws.js'),
    run = require('../../common/test.js').instance.run,
    Array = require('../../../index.js').Monoid.instances.Array;

run(laws, {
  name: 'Array',
  domains: {'m a': [new Array([1, 2]), new Array([3, 4])]},
  check: require('../../common/equality.js').simple
});
