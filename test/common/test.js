'use strict';

function typedTuples(n, domains) {

  // Generate the next `tuple` (mutates `tuple`).
  function next(tuple, i, domainLengths) {
    if (++tuple[i] === domainLengths[i]) {
      tuple[i] = 0;
      if (i+1 < n)
        tuple = next(tuple, i+1, domainLengths);
    }
    return tuple;
  }

  // Given a `tuple`, index into `domain`.
  function transform(tuple, domains) {
    var res = new Array(n);
    for (var i=0; i<n; i++)
      res[i] = domains[i][tuple[i]];
    return res;
  }

  // Cache the lengths of the `domains`.
  var domainLengths = domains.map(function(domain) {
    return domain.length;
  });

  // Calculate the number of `tuple`s to generate.
  var m = domainLengths.reduce(function(a, length) {
    return a * length;
  }, 1);

  // Initialize `tuple` and `tuples`.
  var tuple  = new Array(n),
      tuples = new Array(m);
  tuple[0] = -1; for (var i=1; i<n; i++) { tuple[i] = 0; }

  // Generate `tuples`.
  for (var i=0; i<m; i++)
    tuples[i] = transform(next(tuple, 0, domainLengths), domains);

  return tuples;

}

function testLaw(law, instance, verbose, done, error) {

  var domains = law.types.map(function(type) { return instance.domains[type]; }),
      es      = law.equivalences,
      n       = es[0].length,
      tuples  = typedTuples(n, domains),
      ts      = tuples.length,
      m       = es.length,
      check   = instance.check;
  var util = require('util');
  var incomplete = ts * (m-1);
  function complete() {
    incomplete--;
    if (incomplete === 0)
      done();
  }
  function errorInstance(i) {
    return function() {
      error(tuples[i]);
    };
  }
  for (var i=0; i<ts; i++) {
    for (var j=0; j<m-1; j++) {
      if (!check(es[j  ].apply(undefined, tuples[i]),
                 es[j+1].apply(undefined, tuples[i]), complete, errorInstance(i)) &&
           typeof done === 'undefined')
        return tuples[i];
    }
  }
}

function runInstance(laws, instance, verbose) {
  var util = require('util');
  describe(instance.name + ':', function() {
    for (var name in laws) {
      (function(name) {
        if (instance.async === true)
          it(name, function(done) {
            testLaw(laws[name], instance, verbose, done, function(refuted) {
              throw new Error("Refuted for " + util.inspect(refuted) + ".");
            });
            /*var refuted = testLaw(laws[name], instance, verbose, done);
            if (refuted)
              throw new Error("Refuted for " + util.inspect(refuted) + ".");*/
          });
        else
          it(name, function() {
            var refuted = testLaw(laws[name], instance, verbose);
            if (refuted)
              throw new Error("Refuted for " + util.inspect(refuted) + ".");
          });
      })(name);
    }
  });
}

function runNoninstance(laws, typeclass, instance) {
  describe(instance.name + ':', function() {
    it ('is not a ' + typeclass, function() {
      var passed = [],
          numLaws = 0;
      for (var name in laws) {
        numLaws++;
        var refuted = testLaw(laws[name], instance);
        if (!refuted)
          passed.push(name);
      }
      if (passed.length === numLaws)
        throw new Error(instance.name + ' passed ' + passed.join(', ') + '.');
    });
  });
}

module.exports = {
  instance: {
    run: runInstance
  },
  noninstance: {
    run: runNoninstance
  }
};
