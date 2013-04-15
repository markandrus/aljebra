// Monad.js 0.0.1
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡

// Conforms to the Fantasy Land specification.

// Instances
// =========

function Id(a) {
  this.value = a;
}

Id.prototype.chain = function(f) {
  return f(this.value);
};

Id.prototype.of = function(a) {
  return new Id(a);
};

// Exports
// =======

module.exports = {
  instances: {
    Id: Id
  }
};
