// Applicative.js 0.0.1
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡

// Conforms to the Fantasy Land specification.

// Instances
// =========

var instances = require('./Monad.js').instances.map(function(instance) {
  instance.prototype.ap = function(b) {
    return this.chain(function(f) {
      return b.map(f);
    });
  };
  return instance;
});

module.exports = {
  instances: instances
};
