'use strict';

var util = require('../util.js'),
    addGetter = util.addGetter;

function List(as) {
  var self = this instanceof List ? this
           : Object.create(List.prototype);
  addGetter(self, 'unList', as);
  return Object.freeze(self);
}

// Monoid
// ------

List.empty = function() {
  return new List([]);
};

List.prototype.concat = function(b) {
  return new List(this.unList().concat(b.unList()));
};

// Foldable
// --------

List.prototype.reduceRight = function(f, z) {
  return new List(this.unList().reduceRight(f, z));
};

// Functor
// -------

List.prototype.map = function(f) {
  return new List(this.unList().map(function(a) {
    return f(a);
  }));
};

// Applicative
// -----------

List.of = function(a) {
  return new List([a]);
};

List.prototype.ap = function(as) {
  return new List(this.unList().reduceRight(function(z, f) {
    return z.concat(as.unList().map(function(a) {
      return f(a);
    }));
  }, []));
};

// Chain
// -----

List.prototype.chain = function(f) {
  return new List(this.unList().reduceRight(function(z, a) {
    return z.concat(f(a).unList());
  }, []));
};

module.exports = List;
