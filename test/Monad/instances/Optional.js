var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var Optional = require('../../../lib/Monad.js').instances.Optional;

var instance = {
  name: 'Optional',
  domains: {
    'm a': [Optional.of(), Optional.of(1)],
    'a': [1, 2],
    'a -> m a': [
      function(a) {
        return Optional.of(10-a);
      },
      function(a) {
        return Optional.of(5-a);
      }
    ]
  },
  check: require('../../common/equality.js').simple
};

run(instance, laws);
