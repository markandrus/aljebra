var laws = require('../laws.js')
  , run  = require('../../common/test.js').run;

var First = require('../../../lib2/Semigroup.js').instances.First;

var instance = {
  name: 'First',
  domains: {'m a': [new First(7), new First(6), new First(5)]},
  check: require('../../common/equality.js').simple
};

run(instance, laws);
