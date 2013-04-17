module.exports = {
  'Identity (Functor)': {
    types: ['m a'],
    equivalences: [
      function(m) {
        return m.map(function(a) {
          return a;
        });
      },
      function(m) {
        return m;
      }
    ],
  },
  'Composition (Functor)': {
    types: ['m a', 'b -> c', 'a -> b'],
    equivalences: [
      function(m, f, g) {
        return m.map(function(x) {
          return f(g(x));
        });
      },
      function(m, f, g) {
        return m.map(g).map(f);
      }
    ]
  }
};
