'use strict';

var util = require('../util.js'),
    addGetter = util.addGetter;

function First(a) {
  var self = this instanceof First ? this
           : Object.create(First.prototype);
  addGetter(self, 'getFirst', a);
  return Object.freeze(self);
}

First.prototype.concat = function() {
  return this;
};

function Last(a) {
  var self = this instanceof Last ? this
           : Object.create(Last.prototype);
  addGetter(self, 'getLast', a);
  return Object.freeze(self);
}

Last.prototype.concat = function(b) {
  return b;
};

function Max(a) {
  var self = this instanceof Max ? this
           : Object.create(Max.prototype);
  addGetter(self, 'getMax', a);
  return Object.freeze(self);
}

Max.prototype.concat = function(m) {
  var a = this.getMax(), b = m.getMax();
  return new Max(a > b ? a : b);
};

function Min(a) {
  var self = this instanceof Min ? this
           : Object.create(Min.prototype);
  addGetter(self, 'getMin', a);
  return Object.freeze(self);
}

Min.prototype.concat = function(m) {
  var a = this.getMin(), b = m.getMin();
  return new Min(a < b ? a : b);
};

module.exports = {
  First: First,
  Last: Last,
  Max: Max,
  Min: Min
};
