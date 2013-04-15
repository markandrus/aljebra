var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var Id = require('../../../lib/Functor.js').instances.Id;

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
    ],
    'a -> b': [function(a) { return Number(a).toString(); }],
    'b -> c': [function(b) { return typeof b === 'string'; }]
  },
  check: require('../../common/equality.js').simple
};

run(instance, laws);
