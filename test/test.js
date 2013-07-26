var assert = require('assert');

function tuplesFrom() {
  var vs = arguments, ts = [],
      t = Array.prototype.map.call(arguments, function() { return 0; });
      n = Array.prototype.reduce.call(arguments, function(a, bs) {
            return a * bs.length;
          }, 1);
  function nextTuple(t) {
    for (var i=0; i<t.length; i++)
      if (++t[i] < vs[i].length)
        break;
      else
        t[i] = 0;
    return t;
  }
  function toTuple(t) {
    return t.map(function(i, j) {
      return vs[j][i];
    });
  }
  for (var i=0; i<n; i++)
    ts.push(toTuple(nextTuple(t).slice(0)));
  return ts;
}

// Inputs
// ------

// fa :: a -> m a
function fa(a) {
  return m.of(a.toUpperCase());
}

var fs = [fa];

// ga :: a -> m a
function ga(a) {
  return m.of(a.slice(1));
}

var gs = [ga];

// b2c :: b -> c
function b2c(b) {
  return b ? 1 : 0;
}

// a2b :: a -> b
function a2b(a) {
  return a.length === 0;
}

// Laws
// ----

function _laws(constructors, dictionary) {
  var of  = dictionary.of,
      a   = 'Jello World',
      mas = constructors.map(function(c) { return c(a); });
  return {
    'Monoid': {
      'Left Identity': function() {
        return tuplesFrom(mas).map(function(tuple) {
          var m = tuple[0];
          return [
            dictionary.zero().concat(m),
            m
          ];
        });
      },
      'Right Identity': function() {
        return tuplesFrom(mas).map(function(tuple) {
          var m = tuple[0];
          return [
            m.concat(dictionary.zero),
            m
          ];
        });
      }
    },
    'Functor': {
      'Identity': function() {
        return tuplesFrom(mas).map(function(tuple) {
          var ma = tuple[0];
          return [
            ma.map(function(a) { return a; }),
            ma
          ];
        });
      },
      'Composition': function() {
        return tuplesFrom(mas, [b2c], [a2b]).map(function(tuple) {
          var ma = tuple[0], f = tuple[1], g = tuple[2];
          return [
            ma.map(function(a) { return f(g(a)); }),
            ma.map(g).map(f)
          ];
        });
      }
    },
    'Applicative': {
      'Identity': function() {
        return tuplesFrom(mas).map(function(tuple) {
          var ma = tuple[0];
          return [
            dictionary.of(function(a) { return a; }).ap(ma),
            ma
          ];
        });
      },
      'Composition': function() {
        return tuplesFrom([b2c], [a2b], mas).map(function(tuple) {
          var u = dictionary.of(tuple[0]), v = dictionary.of(tuple[1]), w = tuple[2];
          return [
            dictionary.of(function(f) { return function(g) { return function(x) { return f(g(x)); }; }; }).ap(u).ap(v).ap(w),
            u.ap(v.ap(w))
          ];
        });
      },
      'Homomorphism': function() {
        return tuplesFrom([a2b]).map(function(tuple) {
          var f = tuple[0];
          return [
            dictionary.of(f).ap(dictionary.of(a)),
            dictionary.of(f(a))
          ];
        });
      },
      'Interchange': function() {
        return tuplesFrom([a2b]).map(function(tuple) {
          var u = dictionary.of(tuple[0]);
          return [
            u.ap(dictionary.of(a)),
            dictionary.of(function(f) { return f(a); }).ap(u)
          ];
        });
      }
    },
    'Chain': {
      'Associativity': function() {
        return tuplesFrom(mas, fs, gs).map(function(tuple) {
          var ma = tuple[0], f = tuple[1], g = tuple[2];
          return [
            ma.chain(f).chain(g),
            ma.chain(function(a) { return f(a).chain(g); })
          ];
        });
      }
    },
    'Monad': {
      'Left Identity': function() {
        return tuplesFrom(fs).map(function(tuple) {
          var f = tuple[1];
          return [
            dictionary.of(a).chain(f),
            f(a)
          ];
        });
      },
      'Right Identity': function() {
        return tuplesFrom(mas).map(function(tuple) {
          var ma = tuple[0];
          return [
            ma.chain(dictionary.of),
            ma
          ];
        });
      }
    }
  };
}

function test(opts) {
  describe(opts.name, function() {
    opts.laws.forEach(function(typeclass) {
      describe(typeclass + ':', function() {
        var laws = _laws(opts.constructors, opts.dictionary)[typeclass];
        for (var name in laws) {
          var law = laws[name];
          /* Asynchronous equivalence test. */
          if (opts.equals.length === 3)
            it('should satisfy ' + name, function(done) {
              law().forEach(function(results) {
                for (var i=0; i < results.length-1; i++)
                  opts.equals(function(equal) {
                    done(assert(equal));
                  }, results[i], results[i+1]);
              });
            });
          /* Synchronous equivalence test. */
          else
            it('should satisfy ' + name, function() {
              law().forEach(function(results) {
                for (var i=0; i < results.length-1; i++)
                  assert(opts.equals(results[i], results[i+1]));
              });
            });
        }
      });
    });
  });
};

module.exports = test;
