'use strict';

var laws = require('../laws.js'),
    run = require('../../common/test.js').instance.run,
    Endo = require('../../../index.js').Monoid.instances.Endo;

run(laws, {
  name: 'Endo',
  domains: {
    'm a': [
      new Endo(function(a) {
        return a - 5;
      }),
      new Endo(function(a) {
        return a -10;
      })
    ]
  },
  check: function(f, g) {
    return f.value(42) === g.value(42);
  }
});
