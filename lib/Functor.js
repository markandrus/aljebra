// Functor.js 0.0.1
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡

// Conforms to Fantasy Land specification.

// Instances
// =========

// Monads
// ------

// These are derivable, but the following implementations may be cheaper.

var Monad = require('./Monad.js');

var Id = Monad.instances.Id;

Id.prototype.map = function(f) {
  return Id.of(f(this.value));
};

var Optional = Monad.instances.Optional;

Optional.prototype.map = function(f) {
  if (typeof this.value !== 'undefined')
    return Optional.of(f(this.value));
  else
    return Optional.of();
};

// Exports
// =======

module.exports = {
  instances: {
    Id: Id,
    Optional: Optional
  }
};
