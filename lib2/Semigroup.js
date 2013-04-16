var req = require('./common.js'),
    constructors = require('./constructors.js'),
    Id = constructors.Id,
    Either = constructors.Either;

function Semigroup(concat) {
  req.exactly(1, arguments)
     .type('function', concat);
  function SemigroupInstance() {
    return Id.apply(this, arguments);
  }
  SemigroupInstance.prototype.concat = function(a) {
    req.exactly(1, arguments);
    return new SemigroupInstance(concat(this.value, a.value));
  };
  return SemigroupInstance;
}

function Dual(semigroup) {
  req.exactly(1, arguments);
  function DualSemigroupInstance() {
    return semigroup.apply(this, arguments);
  }
  DualSemigroupInstance.prototype.concat = function(a) {
    req.exactly(1, arguments);
    var flip = semigroup.prototype.concat.call(a, this);
    Object.defineProperty(flip, 'concat', {
      enumerable: false,
      value: DualSemigroupInstance.prototype.concat
    });
    return flip;
  };
  return DualSemigroupInstance;
}

Either.prototype.concat = function(a) {
  req.exactly(1, arguments);
  var which = 'left' in a ? 'left' : 'right';
  if ('right' in this)
    return Either.of(this.right);
  else
    return new Either(which, a[which]);
};

var First = new Semigroup(function(a, b) {
  return a;
});

var Last = new Dual(First);

var Max = new Semigroup(function(a, b) {
  return a > b ? a : b;
});

var Min = new Semigroup(function(a, b) {
  return a < b ? a : b;
});

module.exports = {
  constructors: {
    Semigroup: Semigroup,
    Dual: Dual
  },
  instances: {
    Either: Either,
    First: First,
    Last: Last,
    Max: Max,
    Min: Min
  }
};
