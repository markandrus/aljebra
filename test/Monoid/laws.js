var extend = require('../../lib/common.js').extend,
    SemigroupLaws = require('../Semigroup/laws.js');

module.exports = extend(SemigroupLaws, {
  'Left Identity (Monoid)': {
    types: ['m a'],
    equivalences: [
      function(a) {
        return (a.constructor.zero || a.zero)().concat(a);
      },
      function(a) {
        return a;
      }
    ]
  },
  'Right Identity (Monoid)': {
    types: ['m a'],
    equivalences: [
      function(a) {
        return a.concat((a.constructor.zero || a.zero)());
      },
      function(a) {
        return a;
      }
    ]
  }
});
