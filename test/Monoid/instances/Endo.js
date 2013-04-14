var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var instance = {
  name: 'Endo',
  constructor: require('../../../lib/Monoid.js').instances.Endo,
  domain: [
    function (a) {
      return a - 5;
    },
    function(a) {
      return a - 10;
    }
  ],
  check: function(f, g) {
    return f.value(42) === g.value(42);
  }
};

run(instance, laws);
