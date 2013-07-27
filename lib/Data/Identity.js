'use strict';

var util = require('../util.js'),
    addMethod = util.addMethod,
    addGetter = util.addGetter,
    id = util.id;

// Identity
// ========
//
// Instances:
//
//   * Functor
//   * Applicative
//   * Chain
//   * Monad

function Identity(a) {
  var self = this instanceof Identity ? this
           : Object.create(Identity.prototype);
  addGetter(self, 'runIdentity', a);
  return Object.freeze(self);
}

function equal(c, d) {
  return c.runIdentity() === d.runIdentity();
}

// Functor
// -------

Identity.prototype.map = function(f) {
  return Identity(f(this.runIdentity()));
};

// Applicative
// -----------

Identity.of = Identity;

Identity.prototype.ap = function(f) {
  return f.map(this.runIdentity());
};

// Chain
// -----

Identity.prototype.chain = function(k) {
  return k(this.runIdentity());
};

module.exports = Identity;