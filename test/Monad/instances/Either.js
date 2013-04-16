var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var Either = require('../../../lib/Monad.js').instances.Either;

var instance = {
  name: 'Either',
  domains: {
    'm a': [new Either('left'), Either.of(1), Either.of(2)],
    'a': [1, 2],
    'a -> m a': [
      function(a) {
        return Either.of(10-a);
      },
      function(a) {
        return Either.of(5-a);
      },
      function(a) {
        return new Either('left');
      }
    ],
    'a -> b': [function(a) { return Number(a).toString(); }],
    'b -> c': [function(b) { return typeof b === 'string'; }]
  },
  check: require('../../common/equality.js').simple
};

run(instance, laws);
