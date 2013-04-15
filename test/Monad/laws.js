module.exports = {
  'Associativity (Chain)': {
    types: ['m a', 'a -> m a', 'a -> m a'],
    equivalences: [
      function(m, f, g) {
        return m.chain(f).chain(g);
      },
      function(m, f, g) {
        return m.chain(function(x) {
          return f(x).chain(g);
        });
      }
    ]
  },
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
};
