'use strict';

var util = require('../util.js'),
    addGetter = util.addGetter;

function Dual(s) {
  var self = this instanceof Dual ? this
           : Object.create(Dual.prototype);
  addGetter(self, 'getDual', s);
  return Object.freeze(self);
}

Dual.prototype.concat = function(b) {
  return new Dual(b.getDual().concat(this.getDual()));
};
