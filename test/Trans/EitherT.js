'use strict';

var Identity = require('../../lib/index.js').Data.Identity,
    EitherT = require('../../lib/index.js').Trans.EitherT(Identity),
    test = require('../test.js');

test({
  name: 'EitherT Identity',
  laws: ['Functor', 'Applicative', 'Chain', 'Monad'],
  constructors: [EitherT.of],
  dictionary: EitherT,
  equals: function(ma, mb) {
    var a = ma.runEitherT().runIdentity(),
        b = ma.runEitherT().runIdentity();
    return a.isLeft()  && b.isLeft()  && a.fromLeft()  === b.fromLeft()
        || a.isRight() && b.isRight() && a.fromRight() === b.fromRight();
  }
});
