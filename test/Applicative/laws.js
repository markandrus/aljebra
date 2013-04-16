// WARN: Have not checked these yet!

var ApplicativeLaws = {
  'Identity (Applicative)': {
    types: ['m a'],
    equivalences: [
      function(v) {
        var a = v;
        if (typeof v.of === 'undefined')
          throw new Error('Object does not provide `of`.');
        if (typeof v.ap === 'undefined')
          throw new Error('Object does not provide `ap`.');
        return a.of(function(a) { return a; }).ap(v);
      },
      function(v) {
        return v;
      }
    ]
  },
  'Composition (Applicative)': {
    types: ['m (b -> c)', 'm (a -> b)', 'm a'],
    equivalences: [
      function(u, v, w) {
        var a = u;
        if (typeof v.of === 'undefined')
          throw new Error('Object does not provide `of`.');
        if (typeof v.ap === 'undefined')
          throw new Error('Object does not provide `ap`.');
        return a.of(function(f) { return function(g) { return function(x) { return f(g(x)); } } }).ap(u).ap(v).ap(w);
      },
      function(u, v, w) {
        return u.ap(v.ap(w));
      }
    ]
  },
  'Homomorphism (Applicative)': {
    types: ['m a', 'a -> b', 'a'],
    equivalences: [
      function(a, f, x) {
        if (typeof a.of === 'undefined')
          throw new Error('Object does not provide `of`.');
        if (typeof a.ap === 'undefined')
          throw new Error('Object does not provide `ap`.');
        return a.of(f).ap(a.of(x));
      },
      function(a, f, x) {
        return a.of(f(x));
      }
    ]
  },
  'Interchange (Applicative)': {
    types: ['m (a -> b)', 'a'],
    equivalences: [
      function(u, y) {
        var a = u;
        if (typeof a.of === 'undefined')
          throw new Error('Object does not provide `of`.');
        if (typeof a.ap === 'undefined')
          throw new Error('Object does not provide `ap`.');
        return u.ap(a.of(y));
      },
      function(u, y) {
        var a = u;
        return a.of(function(f) { return f(y); }).ap(u);
      }
    ]
  }
};

module.exports = ApplicativeLaws;
