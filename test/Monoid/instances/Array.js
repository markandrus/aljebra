var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var Array = require('../../../lib/Monoid.js').instances.Array;

var instance = {
  name: 'Array',
  domains: {'m a': [new Array([1, 2]), new Array([3, 4])]},
  check: require('../../common/equality.js').simple
};

run(instance, laws);
