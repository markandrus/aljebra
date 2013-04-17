'use strict';

var req = {
  type: function(t, a) {
    if (typeof a !== t)
      throw new Error('Expects argument of type `' + t + '`.');
    return req;
  },
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
  exactly: function(n, args) {
    var s = n > 1 ? 's' : '',
        str = n > 0 ? 'Expects ' + n + ' argument' + s + '.'
                    : 'Expects zero arguments.';
    if (args.length !== n)
      throw new Error(str);
    return req;
  },
  instance: function(a, b) {
    if (!(a instanceof b))
      throw new Error('Expects instance of `' + b + '`.');
    return req;
  }
};

function extend(a, b) {
  req.atleast(2, arguments);
  var c = {};
  for (var prop in a)
    c[prop] = a[prop];
  Array.prototype.slice.call(arguments, 1).forEach(function(b) {
    for (var prop in b)
      c[prop] = b[prop];
  });
  return c;
}

module.exports = {
  req: req,
  extend: extend
};
