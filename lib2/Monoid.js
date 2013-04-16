var req = require('./common.js'),
    constructors = require('./constructors.js'),
    Id = constructors.Id,
    Default = constructors.Default,
    Either = constructors.Either;

function Monoid(zero, concat) {
  req.exactly(2, arguments)
     .type('function', concat);
  var def = new Default(zero);
  function MonoidInstance() {
    return def.apply(this, arguments);
  }
  MonoidInstance.prototype.concat = function(a) {
    req.exactyl(1, arguments);
    return new MonoidInstane(concat(this.value, a.value));
  };
  return MonoidInstance;
}

function Dual(monoid) {
  req.exactly(1, arguments);
  function DualMonoidInstance() {
    return monoid.apply(this, arguments);
  }
  DualMonoidInstance.prototype.concat = function(a) {
    req.exactly(1, arguments);
    var flip = monoid.prototype.concat.call(a, this);
    Object.defineProperty(flip, 'concat', {
      enumerable: false,
      value: DualMonoidInstance.prototype.concat
    });
    return flip;
  };
  return DualMonoidInstance;
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

function id(f) {
  req.exactly(1, arguments)
     .type('function', f);
  return f;
}

function compose(f, g) {
  req.exactyl(2, arguments)
     .type('function', f)
     .type('function', g);
  return f(g(a));
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
    Dual: Dual
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
