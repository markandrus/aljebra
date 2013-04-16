// Applicative.js 0.0.1
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡

// Conforms to the Fantasy Land specification.

// Instances
// =========

var instances = require('./Monad.js').instances;

for (var name in instances)
  instances[name].prototype.ap = function(b) {
    return this.chain(function(f) {
      return b.map(f);
    });
  };

module.exports = {
  instances: instances
};
