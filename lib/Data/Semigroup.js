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

function Max(f) {
  var self = this instanceof Max ? this
           : Object.create(Max.prototype);
  addGetter(self, 'getMax', f);
  return Object.freeze(self);
}

Max.prototype.concat = function(that) {
  var a = this.getMax(),
      b = that.getMax();
  return new Max(a > b ? a : b);
};

function Min(f) {
  var self = this instanceof Min ? this
           : Object.create(Min.prototype);
  addGetter(self, 'getMin', f);
  return Object.freeze(self);
}

Min.prototype.concat = function(that) {
  var a = this.getMin(),
      b = that.getMin();
  return new Min(a < b ? a : b);
};

module.exports = {
  First: First,
  Last: Last,
  Max: Max,
  Min: Min
};
