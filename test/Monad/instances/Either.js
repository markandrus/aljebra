'use strict';

var laws = require('../laws.js'),
    run = require('../../common/test.js').instance.run,
    Either = require('../../../index.js').constructors.Either;

run(laws, {
  name: 'Either',
  domains: {
    'm a': [new Either('left', false), Either.of(1), Either.of(2)],
    'a': [1, 2],
    'a -> m a': [
      function(a) {
        return Either.of(10-a);
      },
      function(a) {
        return Either.of(5-a);
      }
    ],
    'a -> b': [function(a) { return Number(a).toString(); }],
    'b -> c': [function(b) { return typeof b === 'string'; }],
    'm (a -> b)': [Either.of(function(a) { return Number(a).toString(); })],
    'm (b -> c)': [Either.of(function(b) { return typeof b === 'string'; })]
  },
  check: require('../../common/equality.js').simple
});
