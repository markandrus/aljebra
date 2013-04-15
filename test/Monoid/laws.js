module.exports = {
  'Associativity (Semigroup)': {
    types: ['m a', 'm a', 'm a'],
    equivalences: [
      function(a, b, c) {
        return a.concat(b).concat(c);
      },
      function(a, b, c) {
        return a.concat(b.concat(c));
      }
    ]
  },
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
};
