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

// First
// -----

var First = new Semigroup(function(a, b) {
  return a;
});

// TODO: I'd like to change the `Dual` constructor so that we could write
//
//    var Last = Dual(First);
//
//    var a = new Last(1); // Instead of `var a = new Last(First(1));`.

var Last = new Semigroup(function(a, b) {
  return b;
});

// Either
// ------`

function Either(left, right) {
  if ((typeof left !== 'undefined' && typeof right !== 'undefined') ||
      (typeof left === 'undefined' && typeof right === 'undefined'))
    throw new Error('Either zero or two values supplied instead of one.');
  this.left  = left;
  this.right = right;
  return this;
}

Either.prototype.concat = function(a) {
  if (typeof this.right !== 'undefined')
    return new Either(undefined, this.right);
  else
    return new Either(a.left, a.right);
};

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
    Either: Either,
    Endo: Monoid.instances.Endo,
    First: First,
    Last: Last,
    Max: Max,
    Min: Min,
    Product: Monoid.instances.Product,
    Sum: Monoid.instances.Sum
  }
};
