var Either = require('../../lib/index.js').Data.Either,
    test = require('../test.js');

test({
  name: 'Either',
  laws: ['Functor', 'Applicative', 'Monad'],
  constructors: [Either.Left, Either.Right],
  dictionary: Either,
  equals: function(a, b) {
    return a.isLeft()  && b.isLeft()  && a.fromLeft()  === b.fromLeft()
        || a.isRight() && b.isRight() && a.fromRight() === b.fromRight();
  }
});
