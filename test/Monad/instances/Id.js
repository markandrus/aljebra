var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var Id = require('../../../lib/Monad.js').instances.Id;

var instance = {
  name: 'Id',
  domains: {
    'm a': [new Id(1), new Id(2)],
    'a': [1, 2],
    'a -> m a': [
      function(a) {
        return new Id(10-a);
      },
      function(a) {
        return new Id(5-a);
      }
    ]
  },
  check: require('../../common/equality.js').simple
};

run(instance, laws);
