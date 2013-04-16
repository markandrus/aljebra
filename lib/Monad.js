// Monad.js 0.0.1
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡

// Conforms to the Fantasy Land specification.

// Instances
// =========

// Id
// --

function Id(a) {
  this.value = a;
}

Id.prototype.chain = function(f) {
  return f(this.value);
};

Id.of = Id.prototype.of = function(a) {
  return new Id(a);
};

// Optional
// --------

function Optional(a) {
  this.value = a;
}

Optional.prototype.chain = function(f) {
  return typeof this.value === 'undefined'
    ? Optional.of()
    : f(this.value);
};

Optional.of = Optional.prototype.of = function(a) {
  return new Optional(a);
};

// Either
// ------

var Either = require('./Semigroup.js').instances.Either;

Either.of = Either.prototype.of = function(a) {
  return new Either(undefined, a);
};

Either.prototype.chain = function(f) {
  if (typeof this.left !== 'undefined') {
    return new Either(this.left);
  } else {
    var next  = f(this.right),
        left  = next.left,
        right = next.right;
    return new Either(left, right);
  }
};

// Exports
// =======

module.exports = {
  instances: {
    Id: Id,
    Either: Either,
    Optional: Optional
  }
};
