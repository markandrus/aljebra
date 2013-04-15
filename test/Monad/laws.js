module.exports = {
  'Associativity (Chain)': [
    function(m, f, g) {
      return m.chain(f).chain(g);
    },
    function(m, f, g) {
      return m.chain(function(x) {
        return f(x).chain(g);
      });
    }
  ],
  'Left Identity (Monad)': [
    function(m, a, f) {
      return m.of(a).chain(f);
    },
    function(m, a, f) {
      return f(a);
    },
  ],
  'Right Identity (Monad)': [
    function(m) {
      return m.chain(m.of);
    },
    function(m) {
      return m;
    }
  ]
};
