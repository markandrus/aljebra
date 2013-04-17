'use strict';

var laws = require('../laws.js'),
    run = require('../../common/test.js').instance.run,
    Optional = require('../../../index.js').constructors.Optional;

run(laws, {
  name: 'Optional',
  domains: {
    'm a': [new Optional(), Optional.of(1)],
    'a': [1, 2],
    'a -> m a': [
      function(a) {
        return Optional.of(10-a);
      },
      function(a) {
        return Optional.of(5-a);
      },
      function(a) {
        return new Optional();
      }
    ],
    'a -> b': [function(a) { return Number(a).toString(); }],
    'b -> c': [function(b) { return typeof b === 'string'; }],
    'm (a -> b)': [new Optional(), Optional.of(function(a) { return Number(a).toString(); })],
    'm (b -> c)': [new Optional(), Optional.of(function(b) { return typeof b === 'string'; })]
  },
  check: require('../../common/equality.js').simple
});
