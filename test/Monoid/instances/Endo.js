var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var Endo = require('../../../index2.js').Monoid.instances.Endo;

function fun1(a) {
  return a - 5;
}

function fun2(a) {
  return a - 10;
}

var instance = {
  name: 'Endo',
  domains: {'m a': [new Endo(fun1), new Endo(fun2)]},
  check: function(f, g) {
    return f.value(42) === g.value(42);
  }
};

run(instance, laws);
