// Monoid.js 0.0.1
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡

// Instances borrowed from Haskell libraries.
// Conforms to the Fantasy Land specification.

// Requirements
// ============

// A value that implements the Monoid specification
// must also implement the Semigroup specficiation.

// Constructor
// ===========

// Construct a Monoid instance from a `zero` value and `concat` function.

function Monoid(zero, concat) {
  function MonoidInstance(a) {
    this.value = typeof a === 'undefined' ? zero : a;
    return this;
  }
  MonoidInstance.prototype.concat = function(a) {
    this.value = concat(this.value, a.value);
    return this;
  };
  MonoidInstance.prototype.constructor.zero = function() {
    return new MonoidInstance();
  }
  return MonoidInstance;
}

// Construct a Monoid instance from a `zero` value based on a Semigroup.

function MonoidFromSemigroup(semigroup, zero) {
  function MonoidInstance(a) {
    this.value = typeof a === 'undefined' ? zero : a;
    return this;
  }
  // Stick all of the properties of the semigroup onto the prototype.
  MonoidInstance.prototype = new semigroup();
  MonoidInstance.prototype.constructor.zero = function() {
    return new MonoidInstance();
  };
  return MonoidInstance;
}

// Instances
// =========

// All
// ---

var All = new Monoid(true, function(a, b) {
  return a && b;
});

// Any
// ---

var Any = new Monoid(false, function(a, b) {
  return a || b;
});

// Array
// -----

var Array = new Monoid([], function(a, b) {
  return a.concat(b);
});

// Dual
// ----

// Construct the dual of a Monoid instance by swapping the arguments of its
// `concat` function.

// FIXME: !!!

function Dual(monoid) {
  return new Monoid((monoid.constructor.zero || monoid.zero)(), function(a, b) {
    return b.concat(a);
  });
}

// Endo
// ----

// "The monoid of endomorphisms under composition."

function id(f) {
  return f;
};

function composition(f, g) {
  return function(a) {
    return f(g(a));
  };
};

var Endo = new Monoid(id, composition);

// Product
// -------

var Product = new Monoid(1, function(a, b) {
  return a * b;
});

// Sum
// ---

var Sum = new Monoid(0, function(a, b) {
  return a + b;
});

// Exports
// =======

module.exports = {
  constructors: {
    Monoid: Monoid,
    MonoidFromSemigroup: MonoidFromSemigroup
  },
  instances: {
    All: All,
    Any: Any,
    Array: Array,
    Endo: Endo,
    Product: Product,
    Sum: Sum
  }
};
