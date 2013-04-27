'use strict';

var req = require('./common.js').req,
    constructors = require('./constructors.js'),
    Id = constructors.Id,
    Optional = constructors.Optional,
    Either = constructors.Either,
    Cont = constructors.Cont;

Id.of = Id.prototype.of = function(a) {
  req.exactly(1, arguments);
  return new Id(a);
};

Id.chain = Id.prototype.chain = function(f) {
  req.exactly(1, arguments)
     .type('function', f);
  var m = f(this.value);
  req.instance(m, this.constructor);
  return m;
};

Optional.of = Optional.prototype.of = function(a) {
  req.exactly(1, arguments);
  return new Optional(a);
};

Optional.chain = Optional.prototype.chain = function(f) {
  req.exactly(1, arguments)
     .type('function', f);
  if ('value' in this) {
    var m = f(this.value);
    req.instance(m, this.constructor);
    return m;
  } else {
    return new Optional();
  }
};

Either.of = Either.prototype.of = function(a) {
  req.exactly(1, arguments);
  return new Either('right', a);
};

Either.chain = Either.prototype.chain = function(f) {
  req.exactly(1, arguments)
     .type('function', f);
  if ('right' in this) {
    var m = f(this.right);
    req.instance(m, this.constructor);
    return m;
  } else {
    return new Either('left', this.left);
  }
};

Cont.of = Cont.prototype.of = function(a) {
  req.exactly(1, arguments);
  return new Cont(function(f) {
    //req.exactly(1, arguments)
    //   .type('function', f);
    return f(a);
  });
}

Cont.chain = Cont.prototype.chain = function(f) {
  req.exactly(1, arguments)
     .type('function', f);
  var self = this;
  return new Cont(function(next) {
    return self.next(function(a) {
      return f(a).next(next);
    });
  });
};

module.exports = {
  instances: {
    Id: Id,
    Optional: Optional,
    Either: Either,
    Cont: Cont
  }
};
