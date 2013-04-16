// Semigroup.js 0.0.1
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡

// Conforms to Fantasy Land specification.

// Re-exports
// ==========

var Monoid = require('./Monoid.js');

// Constructors
// ============

// Creates a Semigroup with a concat method.

function Semigroup(concat) {
  function SemigroupInstance(a) {
    this.value = a;
    return this;
  }
  SemigroupInstance.prototype.concat = function(a) {
    return new SemigroupInstance(concat(this.value, a.value));
  };
  return SemigroupInstance;
}

// Dual
// ----

// Construct the dual of a Semigroup by swapping the arguments of its `concat`
// function.

function Dual(semigroup) {
  return new Semigroup(function(a, b) {
    return b.concat(a);
  });
}

// Instances
// =========

// Max
// ---

var Max = new Semigroup(function(a, b) {
  return a > b ? a : b;
});

// Min
// ---

var Min = new Semigroup(function(a, b) {
  return a < b ? a : b;
});

// Exports
// =======

module.exports = {
  constructors: {
    Semigroup: Semigroup,
    Dual: Dual
  },
  instances: {
    All: Monoid.instances.All,
    Any: Monoid.instances.Any,
    Array: Monoid.instances.Array,
    Endo: Monoid.instances.Endo,
    Max: Max,
    Min: Min,
    Product: Monoid.instances.Product,
    Sum: Monoid.instances.Sum,
  }
};
