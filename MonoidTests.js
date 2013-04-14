// MonoidTests.js 0.0.1
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡

// Tests for the instances defined in `./Monoid.js'.

var Monoid = require('./Monoid.js');

// Laws
// ====

var laws = {
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
      return (a.constructor.zero || a.zero)().concat(a);
    },
    function(a) {
      return a;
    }
  ],
  'Right Identity': [
    function(a) {
      return a.concat((a.constructor.zero || a.zero)());
    },
    function(a) {
      return a;
    }
  ]
};

// Tests
// =====

// Equality
// --------

function simple(a, b) {
  return a.value === b.value;
}

function complex(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

// Instances
// ---------

var instances = {
  All: {
    constructor: Monoid.instances.All,
    domain: [false, true],
    check: simple
  },
  Any: {
    constructor: Monoid.instances.Any,
    domain: [false, true],
    check: simple
  },
  Array: {
    constructor: Monoid.instances.Array,
    domain: [[1,2], [3,4]],
    check: complex
  },
  Endo: {
    constructor: Monoid.instances.Endo,
    domain: [ function double (x) {
                return x + x;
              }
            , function square (x) {
                return x * x;
              }
            ],
    check: complex
  },
  Product: {
    constructor: Monoid.instances.Product,
    domain: [1,2,3,4],
    check: simple
  },
  Sum: {
    constructor: Monoid.instances.Sum,
    domain: [1,2,3,4],
    check: simple
  }
};

// Test Runners
// ============

// Create `n`-tuples of values in `domain`.

function tuples(n, domain) {

  // Calculate the next `n`-tuple of indices from zero to `b-1`, inclusive.
  // Returns a new `n`-tuple.
  function next(as, i, b) {
    as = as.slice(0);
    if (++as[i] === b) {
      as[i] = 0;
      if (i+1 < as.length)
        as = next(as, i+1, b);
    }
    return as;
  }

  // An `n`-tuple and a list of `n`-tuples.
  var tuple  = []
    , tuples = [];

  for (var i=0; i<n; i++)
    tuple.push(0);

  // Generate all `n`-tuples of indices into `domain`.
  for (var i=0; i<Math.pow(domain.length, n); i++) {
    tuples.push(tuple);
    tuple = next(tuple, 0, domain.length);
  }

  // Index into `domain`.
  return tuples.map(function(tuple) {
    return tuple.map(function(i) {
      return domain[i];
    });
  });

}

function TestLaw(law, instance) {
  var ts = tuples
    ( law[0].length
    , instance.domain
    ).map(function(tuple) {
      return tuple.map(function(a) {
        return new instance.constructor(a);
      });
    });
  var es = law.map(function(e) {
      return ts.reduce(function(a, tuple) {
        a.push(e.apply(undefined, tuple));
        return a;
      }, []);
    })
    , pass = true;
  for (var i=0; i<es.length-1; i++) {
    for (var j=0; j<es[i].length; j++) {
      pass = pass & instance.check(es[i][j], es[i+1][j]);
    }
  }
  if (pass)
    console.log("    Pass");
  else
    console.log("    Fail");
}

function TestLaws(laws, instance) {
  for (var name in laws) {
    console.log("  " + name);
    TestLaw(laws[name], instance);
    console.log();
  }
}

function TestInstances(laws, instances) {
  for (var name in instances) {
    console.log(name);
    TestLaws(laws, instances[name]);
  }
}

TestInstances(laws, instances);
