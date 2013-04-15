var laws = require('../laws.js')
  , run  = require('../../common/test.js').runNoninstance;

var Semigroup  = require('../../../lib/Semigroup.js').constructor,
    Difference = new Semigroup(function(a, b) {
      return a - b;
    });

var instance = {
  name: 'Difference',
  domains: {'m a': [new Difference(1), new Difference(2)]},
  check: require('../../common/equality.js').simple
};

run(instance, laws, 'Semigroup');
