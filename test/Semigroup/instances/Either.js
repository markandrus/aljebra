'use strict';

var laws = require('../laws.js'),
    run = require('../../common/test.js').instance.run,
    Either = require('../../../index.js').constructors.Either;

run(laws, {
  name: 'Either',
  domains: {
    'm a': [
      new Either('left', true),
      new Either('left', false),
      new Either('right', 1),
      new Either('right', 2)
    ]
  },
  check: require('../../common/equality.js').simple
});
