var req = require('./common.js'),
    constructors = require('./constructors.js'),
    Id = constructors.Id,
    Optional = constructors.Optional,
    Default = constructors.Default,
    Either = constructors.Either;

Id.prototype.map = function(f) {
  req.exactly(1, arguments)
     .type('function', f);
  return new Id(f(this.value));
};

Optional.prototype.map = function(f) {
  req.exactly(1, arguments)
     .type('function', f);
  if ('value' in this)
    return new Optional(f(this.value));
  else
    return new Optional();
};

Either.prototype.map = function(f) {
  req.exactly(1, arguments)
     .type('function', f);
  if ('left' in this)
    return new Either('left', this.left);
  else
    return Either.of(f(this.right));
};

module.exports = {
  instances: {
    Id: Id,
    Optional: Optional,
    Default: Default,
    Either: Either
  }
};
