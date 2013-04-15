var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var instance = {
  name: 'Endo',
  constructor: require('../../../lib/Semigroup.js').instances.Endo,
  domain: [
    function(x) {
      return x + x;
    },
    function(x) {
      return x * x;
    }
  ],
  check: function(f, g) {
    return f.value(5) === g.value(5);
  }
};

run(instance, laws);
