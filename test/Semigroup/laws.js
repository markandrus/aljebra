module.exports = {
  'Associativity': [
    function(a, b, c) {
      return a.concat(b).concat(c);
    },
    function(a, b, c) {
      return a.concat(b.concat(c));
    }
  ]
};
