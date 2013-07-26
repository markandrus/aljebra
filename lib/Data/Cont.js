'use strict';

var util = require('../util.js'),
    addMethod = util.addMethod,
    addGetter = util.addGetter,
    id = util.id;

// Cont
// ====
//
// Instances:
//
//   * Functor
//   * Applicative
//   * Chain
//   * Monad

function Cont(f) {
  var self = this instanceof Cont ? this
           : Object.create(Cont.prototype);
  addMethod(self, 'runCont', function(g) {
    return f(g);
  });
  return Object.freeze(self);
}

function equal(c, d, done) {
  var as = [], n = 2;
  function callback(a) {
    as.push(a);
    if (--n == 0)
      done(as[0] === as[1]);
  }
  c.runCont(callback);
  d.runCont(callback);
}

// Functor
// -------

Cont.prototype.map = function(f) {
  var self = this;
  return Cont(function(g) {
    return self.runCont(function(a) {
      return g(f(a));
    });
  });
};

// Applicative
// -----------

Cont.of = function(a) {
  return Cont(function(f) {
    return f(a);
  });
};

Cont.prototype.ap = function(v) {
  var self = this;
  return Cont(function(g) {
    return self.runCont(function(f) {
      return v.runCont(function(a) {
        return g(f(a));
      });
    });
  });
};

// Chain
// -----

Cont.prototype.chain = function(f) {
  var self = this;
  return Cont(function(g) {
    return self.runCont(function(a) {
      return f(a).runCont(g);
    });
  });
};

module.exports = Cont;
