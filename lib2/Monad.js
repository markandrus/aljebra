var req = require('./common.js'),
    constructors = require('./constructors.js'),
    Id = constructors.Id,
    Optional = constructors.Optional,
    Either = constructors.Either;

Id.of = Id.prototype.of = function(a) {
  req.exactly(1, arguments);
  return new Id(a);
};

Id.chain = Id.prototype.chain = function(f) {
  req.exactly(1, arguments)
     .type('function', f);
  return f(this.value);
};

Optional.of = Optional.prototype.of = function(a) {
  req.exactly(1, arguments);
  return new Optional(a);
};

Optional.chain = Optional.prototype.chain = function(f) {
  req.exactly(1, arguments)
     .type('function', f);
  if ('value' in this)
    return f(this.value);
  else
    return new Optional();
};

Either.of = Either.prototype.of = function(a) {
  req.exactly(1, arguments);
  return new Either('right', a);
};

Either.chain = Either.prototype.chain = function(f) {
  req.exactly(1, arguments)
     .type('function', f);
  if ('right' in this)
    return f(this.right);
  else
    return new Either('left', this.left);
};

module.exports = {
  instances: {
    Id: Id,
    Optional: Optional,
    Either: Either
  }
};
