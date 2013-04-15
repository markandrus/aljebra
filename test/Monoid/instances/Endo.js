var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var Endo = require('../../../lib/Monoid.js').instances.Endo;

var ma1 = new Endo(function fun1(a) {
  return a - 5;
});

var ma2 = new Endo(function fun2(a) {
  return a - 10;
});

var instance = {
  name: 'Endo',
  // domains: {'m a': [new Endo(fun1), new Endo(fun2)]},
  domains: {'m a': [ma1, ma2]},
  check: function(f, g) {
    return f.value(42) === g.value(42);
  }
};

run(instance, laws);
