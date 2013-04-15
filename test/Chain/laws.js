var ChainLaws = {
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
  }
};

module.exports = ChainLaws;
