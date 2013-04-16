require('../../index.js');

var ChainLaws = require('../Chain/laws.js'),
    FunctorLaws = require('../Functor/laws.js'),
    ApplicativeLaws = require('../Applicative/laws.js');

var MonadLaws = ChainLaws.extend(FunctorLaws)
                         .extend(ApplicativeLaws)
                         .extend({
  'Left Identity (Monad)': {
    types: ['m a', 'a', 'a -> m a'],
    equivalences: [
      function(m, a, f) {
        return m.of(a).chain(f);
      },
      function(m, a, f) {
        return f(a);
      },
    ]
  },
  'Right Identity (Monad)': {
    types: ['m a'],
    equivalences: [
      function(m) {
        return m.chain(m.of);
      },
      function(m) {
        return m;
      }
    ]
  }
});

module.exports = MonadLaws;
