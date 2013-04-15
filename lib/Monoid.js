// Monoid.js 0.0.1
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡

// Instances borrowed from Haskell libraries.
// Conforms to the Fantasy Land specification.

// Requirements
// ============

// A value that implements the Monoid specification
// must also implement the Semigroup specficiation.

var Semigroup = require('./Semigroup.js');

// Constructor
// ===========

// Construct a Monoid instance from a `zero` value and `concat` function.

function Monoid(zero, semigroup) {
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

var All = new Monoid(true, Semigroup.instances.And);

// Any
// ---

var Any = new Monoid(false, Semigroup.instances.Or);

// Array
// -----

var Array = new Monoid([], Semigroup.instances.Array);

// Dual
// ----

// Construct the dual of a Monoid instance by swapping the arguments of its
// `concat` function.

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
}

var Endo = new Monoid(id, Semigroup.instances.Compose);

// Product
// -------

var Product = new Monoid(1, Semigroup.instances.Mult);

// Sum
// ---

var Sum = new Monoid(0, Semigroup.instances.Add);

// Exports
// =======

if (typeof module !== 'undefined' && module.exports) {
  module.exports =
    { constructor : Monoid
    , instances   :
      { All       : All
      , Any       : Any
      , Array     : Array
      , Dual      : Dual
      , Endo      : Endo
      , Product   : Product
      , Sum       : Sum
      }
    };
}
