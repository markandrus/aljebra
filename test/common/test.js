/*function tuples(n, domain) {

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

}*/

function typedTuples(n, domains) {

  function next(as, i, domains) {
    as = as.slice(0);
    if (++as[i] === domains[i].length) {
      as[i] = 0;
      if (i+1 < as.length)
        as = next(as, i+1, domains);
    }
    return as;
  }

  var tuple  = [],
      tuples = [];

  for (var i=0; i<n; i++)
    tuple.push(0);

  var n = domains.reduce(function(a, domain) {
    return a * domain.length;
  }, 1);

  for (var i=0; i<n; i++) {
    tuples.push(tuple);
    tuple = next(tuple, 0, domains);
  }

  return tuples.map(function(tuple) {
    for (var i=0; i<tuple.length; i++) {
      tuple[i] = domains[i][tuple[i]];
    }
    return tuple;
  });

}

function testLaw(law, instance) {
  var domains = [];
  law.types.forEach(function(type) {
    domains.push(instance.domains[type]);
  });
  var ts = typedTuples(law.equivalences[0].length, domains);
  var es = law.equivalences.map(function(e) {
    return ts.reduce(function(a, tuple) {
      a.push(e.apply(undefined, tuple));
      return a;
    }, []);
  });
  for (var i=0; i<es.length-1; i++)
    for (var j=0; j<es[i].length; j++)
      if (!instance.check(es[i][j], es[i+1][j]))
        return ts[j];
}

function run(instance, laws) {
  var util = require('util');
  describe(instance.name + ':', function() {
    for (var name in laws) {
      (function(name) {
        it(name, function() {
          var refuted = testLaw(laws[name], instance);
          if (refuted)
            throw new Error("Refuted for " + util.inspect(refuted) + ".");
        });
      })(name);
    }
  });
}

function runNoninstance(instance, laws, typeclass) {
  describe(instance.name + ':', function() {
    it ('is not a ' + typeclass, function() {
      var passed = [],
          numLaws = 0;
      for (var name in laws) {
        numLaws++;
        var passes = testLaw(laws[name], instance);
        if (passes)
          passed.push(name);
      }
      if (passed.length === numLaws)
        throw new Error(instance.name + ' passed ' + passed.join(', ') + '.');
    });
  });
}

module.exports = {
  run: run,
  runInstance: run,
  runNoninstance: runNoninstance
};
