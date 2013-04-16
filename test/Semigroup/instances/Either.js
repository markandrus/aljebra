var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var Either = require('../../../lib/Semigroup.js').instances.Either;

var instance = {
  name: 'Either',
  domains: {
    'm a': [
      new Either('left', undefined),
      new Either('string', undefined),
      new Either(undefined, 1),
      new Either(undefined, 2)
    ]
  },
  check: require('../../common/equality.js').simple
};

run(instance, laws);
