'use strict';

var util = require('../util.js'),
    addMethod = util.addMethod,
    addGetter = util.addGetter,
    id = util.id;

// Maybe
// =====
//
// Instances:
// 
//   * Functor
//   * Applicative
//   * Chain
//   * Monad

function Maybe(a) {
  var self = this instanceof Maybe ? this
           : Object.create(Maybe.prototype);
  // var empty = arguments.length === 0;
  var empty = typeof a === 'undefined';
  addGetter(self, 'isNothing', empty);
  addGetter(self, 'isJust', !empty);
  addMethod(self, 'fromMaybe', function(b) {
    return empty ? b : a;
  });
  if (!empty)
    addGetter(self, 'fromJust', a);
  return Object.freeze(self);
}

Maybe.Nothing = function() {
  return Maybe();
};

Maybe.Just = function(a) {
  return Maybe(a);
};

// Functor
// -------

Maybe.prototype.map = function(f) {
  return this.isNothing() ? Maybe.Nothing()
                          : Maybe.Just(f(this.fromJust()));
};

// Applicative
// -----------

Maybe.of = Maybe.Just;

Maybe.prototype.ap = function(f) {
  return this.isNothing() ? Maybe.Nothing()
                          : f.map(this.fromJust());
};

// Chain
// -----

Maybe.prototype.chain = function(f) {
  return this.isNothing() ? Maybe.Nothing() : f(this.fromJust());
};

module.exports = Maybe;
