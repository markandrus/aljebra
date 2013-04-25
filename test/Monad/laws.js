'use strict';

var extend = require('../../lib/common.js').extend,
    FunctorLaws = require('../Functor/laws.js'),
    ApplicativeLaws = require('../Applicative/laws.js'),
    ChainLaws = require('../Chain/laws.js');

module.exports = extend(FunctorLaws, ApplicativeLaws, ChainLaws, {
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
