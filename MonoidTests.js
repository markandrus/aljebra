// MonoidInstanceTests.js 0.0.1
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡

// Tests for the instances defined in `./Monoid.js'.

// NOTE: Trying to generalize the code here...

var Monoid = require('./Monoid.js'),
    simple = function(a, b) { return JSON.stringify(a) === JSON.stringify(b); };

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
    check: simple
  }
};

// Associativity Law
// =================

function AssociativityLaw(instance) {
  console.log("\tAssociativity Law");
  var check = true;
  for (var a in instance.domain) {
    for (var b in instance.domain) {
      for (var c in instance.domain) {
        var A = new instance.constructor(instance.domain[a])
          , B = new instance.constructor(instance.domain[b])
          , C = new instance.constructor(instance.domain[c]);
        check = check && instance.check
          ( A.concat(B).concat(C)
          , A.concat(B.concat(C))
          );
      }
    }
  }
  if (check)
    console.log("\t\tPassed");
  else
    console.log("\t\tFailed");
}

for (var instance in instances) {
  console.log("Monoid Instance: " + instance);
  AssociativityLaw(instances[instance]);
  console.log();
}

// Left Identity Law
// =================

// Right Identity Law
// ==================
