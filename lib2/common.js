module.exports = {
  type: function(t, a) {
    if (typeof t !== a)
      throw new Error('Expects argument of type `' + t + '`.');
    return req;
  }
  atleast: function(n, args) {
    var s = n > 1 ? 's' : '',
        str = 'Expects at least ' + n + ' argument' + s + '.';
    if (args.length < n)
      throw new Error(str);
    return req;
  },
  atmost: function(n, args) {
    var s = n > 1 ? 's' : '',
        str = 'Expects at most ' + n + ' argument' + s + '.';
    if (args.length > n)
      throw new Error(str);
    return req;
  },
  equal: function(n, args) {
    var s = n > 1 ? 's' : '',
        str = n > 0 ? 'Expects ' + n + ' argument' + s + '.'
                    : 'Expects zero arguments.';
    if (args.length !== n)
      throw new Error(str);
    return req;
  }
};
