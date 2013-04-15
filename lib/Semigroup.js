// Semigroup.js 0.0.1
// ==================

// Conforms to Fantasy Land specification.

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

// Add
// ---

var Add = new Semigroup(function(a, b) {
  return a + b;
});

// And
// ---

var And = new Semigroup(function(a, b) {
  return a && b;
});

// Array
// -----

var Array = new Semigroup(function(a, b) {
  return a.concat(b);
});

// Compose
// -------

var Compose = new Semigroup(function(f, g) {
  return function (x) {
    return f(g(x));
  };
});

// Mult
// ----

var Mult = new Semigroup(function(a, b) {
  return a * b;
});

// Or
// --

var Or = new Semigroup(function(a, b) {
  return a || b;
});

// Exports
// =======

if (typeof module !== 'undefined' && module.exports) {
  module.exports =
    { constructor : Semigroup
    , instances   :
      { Add       : Add
      , And       : And
      , Array     : Array
      , Compose   : Compose
      , Mult      : Mult
      , Or        : Or
      }
    };
}
