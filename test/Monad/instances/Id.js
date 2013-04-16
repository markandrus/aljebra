var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

//var Id = require('../../../lib/Applicative.js').instances.Id.extend(
//  require('../../../lib/Functor.js').instances.Id);

var Id = require('../../../index2.js').constructors.Id;

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
    'b -> c': [function(b) { return typeof b === 'string'; }],
    'm (a -> b)': [Id.of(function(a) { return Number(a).toString(); })],
    'm (b -> c)': [Id.of(function(b) { return typeof b === 'string'; })]
  },
  check: require('../../common/equality.js').simple
};

run(instance, laws);
