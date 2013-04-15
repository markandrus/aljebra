// Semigroup.js 0.0.1
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡

// Conforms to Fantasy Land specification.

// Re-exports
// ==========

var Monoid = require('./Monoid.js');

// Constructor
// ===========

// Creates a Semigroup with a concat method.

function Semigroup(concat) {
  function SemigroupInstance(a) {
    this.value = a;
    return this;
  }
  SemigroupInstance.prototype.concat = function(a) {
    this.value = concat(this.value, a.value);
    return this;
  };
  return SemigroupInstance;
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
  constructor: Semigroup,
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
