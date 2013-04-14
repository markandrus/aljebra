module.exports = {
  'Associativity': [
    function(a, b, c) {
      return a.concat(b).concat(c);
    },
    function(a, b, c) {
      return a.concat(b.concat(c));
    }
  ],
  'Left Identity': [
    function(a) {
      return a.concat((a.constructor.zero || a.zero)());
    },
    function(a) {
      return a;
    }
  ],
  'Right Identity': [
    function(a) {
      return (a.constructor.zero || a.zero)().concat(a);
    },
    function(a) {
      return a;
    }
  ]
};
