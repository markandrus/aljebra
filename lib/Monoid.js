'use strict';

var req = require('./common.js').req,
    constructors = require('./constructors.js'),
    Id = constructors.Id,
    Optional = constructors.Optional,
    Default = constructors.Default,
    Either = constructors.Either;

function Monoid(zero, concat) {
  req.exactly(2, arguments)
     .type('function', concat);
  var def = new Default(zero);
  function MonoidInstance() {
    def.apply(this, arguments);
    return this;
  }
  MonoidInstance.prototype.concat = function(a) {
    req.exactly(1, arguments)
       .instance(a, this.constructor);
    return new MonoidInstance(concat(this.value, a.value));
  };
  MonoidInstance.prototype.zero = function() {
    req.exactly(0, arguments);
    return new MonoidInstance();
  };
  return MonoidInstance;
}

function Dual(monoid) {
  req.exactly(1, arguments);
  function DualMonoidInstance() {
    return Id.apply(this, arguments);
  }
  DualMonoidInstance.prototype.concat = function(a) {
    req.exactly(1, arguments);
    return new DualMonoidInstance(a.value.concat(this.value));
  };
  DualMonoidInstance.prototype.zero = function() {
    req.exactly(0, arguments);
    return new DualMonoidInstance(monoid.prototype.zero());
  };
  return DualMonoidInstance;
}

function OptionalSemigroup(semigroup) {
  req.exactly(1, arguments);
  function OptionalSemigroupInstance() {
    return Optional.apply(this, arguments);
  }
  OptionalSemigroupInstance.prototype.concat = function(a) {
    req.exactly(1, arguments);
    if ('value' in this || 'value' in a)
      if ('value' in this && 'value' in a)
        return new OptionalSemigroupInstance(this.value.concat(a.value));
      else
        return new OptionalSemigroupInstance(this.value || a.value);
    else
      return this.zero();
  };
  OptionalSemigroupInstance.prototype.zero = function() {
    req.exactly(0, arguments);
    return new OptionalSemigroupInstance();
  };
  return OptionalSemigroupInstance;
}

var All = new Monoid(true, function(a, b) {
  return a && b;
});

var Any = new Monoid(false, function(a, b) {
  return a || b;
});

var Array = new Monoid([], function(a, b) {
  return a.concat(b);
});

function id(a) {
  req.exactly(1, arguments);
  return a;
}

function compose(f, g) {
  req.exactly(2, arguments)
     .type('function', f)
     .type('function', g);
  return function(a) {
    req.exactly(1, arguments);
    return f(g(a));
  };
}

var Endo = new Monoid(id, compose);

var Product = new Monoid(1, function(a, b) {
  return a * b;
});

var Sum = new Monoid(0, function(a, b) {
  return a + b;
});

module.exports = {
  constructors: {
    Monoid: Monoid,
    Dual: Dual,
    OptionalSemigroup: OptionalSemigroup
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
