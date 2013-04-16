var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var Either = require('../../../lib2/Semigroup.js').instances.Either;

var instance = {
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
};

run(instance, laws);
