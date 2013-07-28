'use strict';

var Identity = require('../../lib/index.js').Data.Identity,
    MaybeT = require('../../lib/index.js').Trans.MaybeT(Identity),
    test = require('../test.js');

test({
  name: 'MaybeT Identity',
  laws: ['Functor', 'Applicative', 'Chain', 'Monad'],
  constructors: [MaybeT.of],
  dictionary: MaybeT,
  equals: function(ma, mb) {
    var a = ma.runMaybeT().runIdentity(),
        b = ma.runMaybeT().runIdentity();
    return a.isNothing() && b.isNothing()
        || a.isJust()    && b.isJust()    && a.fromJust() === b.fromJust();
  }
});
