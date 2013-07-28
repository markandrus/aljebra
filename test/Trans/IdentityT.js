'use strict';

var Identity = require('../../lib/index.js').Data.Identity,
    IdentityT = require('../../lib/index.js').Trans.IdentityT(Identity),
    test = require('../test.js');

test({
  name: 'IdentityT Identity',
  laws: ['Functor', 'Applicative', 'Chain', 'Monad'],
  constructors: [IdentityT.of],
  dictionary: IdentityT,
  equals: function(a, b) {
    return a.runIdentityT().runIdentity() === b.runIdentityT().runIdentity();
  }
});
