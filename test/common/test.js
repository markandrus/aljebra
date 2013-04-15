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
    });
  for (var i=0; i<es.length-1; i++) {
    for (var j=0; j<es[i].length; j++) {
      if (!instance.check(es[i][j], es[i+1][j]))
        return ts[j];
    }
  }
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

// TestInstances(laws, instances);

function run(instance, laws) {
  var util = require('util');
  describe(instance.name + ':', function() {
    for (var name in laws) {
      (function(name) {
        it(name, function() {
          var refuted = TestLaw(laws[name], instance);
          if (refuted)
            throw new Error("Refuted for " + util.inspect(refuted) + ".");
        });
      })(name);
    }
  });
}

module.exports = {
  testLaw: TestLaw,
  run: run
};
