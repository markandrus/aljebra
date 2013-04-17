'use strict';

var laws = require('../laws.js'),
    run = require('../../common/test.js').noninstance.run,
    Semigroup = require('../../../index.js').Semigroup.constructors.Semigroup,
    Difference = new Semigroup(function(a, b) {
      return a - b;
    });

run(laws, 'Semigroup', {
  name: 'Difference',
  domains: {'m a': [new Difference(1), new Difference(2)]},
  check: require('../../common/equality.js').simple
});
