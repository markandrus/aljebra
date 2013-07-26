'use strict';

var util = require('../util.js'),
    addMethod = util.addMethod,
    addGetter = util.addGetter,
    id = util.id;

// ContT
// =====
//
// Instances:
// 
//   * Functor
//   * Applicative
//   * Chain
//   * Monad
//   * MonadTrans

function ContT(monad) {

  function ContT(m) {
    var self = this instanceof ContT ? this
             : Object.create(ContT.prototype);
    addMethod(self, 'runContT', function(n) {
      return m(n);
    });
    return Object.freeze(self);
  }

  // Functor
  // -------

  ContT.prototype.map = function(f) {
    var self = this;
    return ContT(function(c) {
      return self.runContT(function(a) {
        return c(f(a));
      });
    });
  };

  // Applicative
  // -----------

  ContT.of = function(a) {
    return ContT(function(f) {
      return f(a);
    });
  };

  ContT.ap = undefined;

  // Chain
  // -----

  ContT.prototype.chain = function(k) {
    var self = this;
    return ContT(function(c) {
      return self.runContT(function(a) {
        return k(a).runContT(c);
      });
    });
  };

  return Object.freeze(ContT);
}

module.exports = ContT;
