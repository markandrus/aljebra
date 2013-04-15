require('../../index.js');

var SemigroupLaws = require('../Semigroup/laws.js');

var MonoidLaws = SemigroupLaws.extend({
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

module.exports = MonoidLaws;
