var req = require('./common.js'),
    constructors = require('./constructors.js'),
    Id = constructors.Id,
    Optional = constructors.Optional,
    Either = constructors.Either;

Id.prototype.of = funtion(a) {
  req.exactly(1, arguments);
  return new Id(a);
};

Id.prototype.chain = function(f) {
  req.exactly(1, arguments)
     .type('function', f);
  return Id.of(f(this.value));
};

Optional.prototype.of = function(a) {
  req.exactly(1, arguments);
  return new Optional(a);
};

Optional.prototype.chain = function(f) {
  req.exactly(1, arguments)
     .type('function', f);
  if ('value' in this)
    return Optional.of(f(this.value));
  else
    return new Optional();
};

Either.prototype.of = function(a) {
  req.exactly(1, arguments);
  return new Either('right', a);
};

Either.prototype.chain = function(f) {
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
