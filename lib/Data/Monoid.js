'use strict';

var util = require('../util.js'),
    addGetter = util.addGetter;

function All(a) {
  var self = this instanceof All ? this
           : Object.create(All.prototype);
  addGetter(self, 'getAll', a);
  return Object.freeze(self);
}

All.empty = function() {
  return new All(true);
};

All.prototype.concat = function(b) {
  return new All(this.getAll() && b.getAll());
};

function Any(a) {
  var self = this instanceof Any ? this
           : Object.create(Any.prototype);
  addGetter(self, 'getAny', a);
  return Object.freeze(self);
}

Any.empty = function() {
  return new Any(false);
}

Any.prototype.concat = function(b) {
  return new Any(this.getAny() || b.getAny());
};

function Endo(f) {
  var self = this instanceof Endo ? this
           : Object.create(Endo.prototype);
  addGetter(self, 'appEndo', f);
  return Object.freeze(self);
}

Endo.empty = function() {
  return new Endo(function(a) {
    return a;
  });
};

Endo.prototype.concat = function(g) {
  return new Endo(function(a) {
    return this.appEndo()(g.appEndo()(a));
  });
};

function Product(a) {
  var self = this instanceof Product ? this
           : Object.create(Product.prototype);
  addGetter(self, 'getProduct', a);
  return Object.freeze(self);
}

Product.empty = function() {
  return new Product(1);
};

Product.prototype.concat = function(b) {
  return new Product(this.getProduct() * b.getProduct());
};

function Sum(a) {
  var self = this instanceof Sum ? this
           : Object.create(Sum.prototype);
  addGetter(self, 'getSum', a);
  return Object.freeze(self);
}

Sum.empty = function() {
  return new Sum(0);
};

Sum.prototype.concat = function(b) {
  return new Sum(this.getSum() + b.getSum());
};

module.exports = {
  All: All,
  Any: Any,
  Endo: Endo,
  Product: Product,
  Sum: Sum
};
