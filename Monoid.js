// Monoid.js 0.0.1
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡

// (ɔ) 2013 Mark Andrus Roberts
// Instances borrowed from the Haskell Prelude.
// Fantasy Land conformant.
// https://github.com/pufuwozu/fantasy-land/blob/master/logo.png

(function() {

// Constructor
// ===========

// Create a Monoid instance from a `zero` value and `concat` function.

function Monoid(zero, concat) {
  function MonoidInstance(a) {
    self.value = typeof a === 'undefined' ? zero : a;
    return self;
  }
  MonoidInstance.prototype.concat = function(a) {
    self.value = concat(self.value, a.value);
    return self;
  };
  MonoidInstance.prototype.constructor.zero = function() {
    return new MonoidInstance();
  }
  return MonoidInstance;
}

// Instances
// =========

// Dual
// ----

// Create the dual of a Monoid instance by swapping the arguments of its
// `concat` function.

function Dual(monoid) {
  return new Monoid(monoid.constructor.zero || monoid.zero, function(a, b) {
    return b.concat(a);
  });
}

// Endo
// ----

function id(f) {
  return f;
};

function composition(f, g) {
  return function(a) {
    return g(f(a));
  };
};

var Endo = new Monoid(id, composition);

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

// Optional
// --------

var Optional = new Monoid(undefined, function(a, b) {
  return typeof a === 'undefined' ? b : a;
});

// Product
// -------

var Product = new Monoid(1, function(a, b) {
  return a * b;
});

// Set
// ---

var Set = new Monoid([], function(a, b) {
  return a.concat(b);
});

// Sum
// ---

var Sum = new Monoid(0, function(a, b) {
  return a + b;
});

// Exports
// =======

if (typeof module !== 'undefined' && module.exports) {
  module.exports =
    { constructor : Monoid
    , instances   :
      { Any      : Any
      , All      : All
      , Dual     : Dual
      , Endo     : Endo
      , Optional : Optional
      , Product  : Product
      , Set      : Set
      , Sum      : Sum
      }
    };
};

}).call(this);
