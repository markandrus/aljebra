var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var Id = require('../../../lib/Monad.js').instances.Id;

var instance = {
  name: 'Id',
  domains: {
    'm a': [Id.of(1), Id.of(2)],
    'a': [1, 2],
    'a -> m a': [
      function(a) {
        return Id.of(10-a);
      },
      function(a) {
        return Id.of(5-a);
      }
    ]
  },
  check: require('../../common/equality.js').simple
};

run(instance, laws);
