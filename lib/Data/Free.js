'use strict';

var util = require('../util.js'),
    addGetter = util.addGetter;

// function Free(f) {

  function Free(which, a) {
    var self = this instanceof Free ? this
             : Object.create(Free.prototype);
    switch (which) {
      case 'Pure':
        addGetter(self, 'isPure', true);
        addGetter(self, 'isFree', false);
        addGetter(self, 'fromPure', a);
        break;
      case 'Free':
        addGetter(self, 'isPure', false);
        addGetter(self, 'isFree', true);
        addGetter(self, 'fromFree', a);
        break;
      default:
        throw new TypeError('Expected "Pure" or "Free".');
    }
    return Object.freeze(self);
  }

  Free.Pure = function(a) {
    return new Free('Pure', a);
  };

  Free.Free = function(f) {
    return new Free('Free', f);
  };

  // Functor
  // -------

  Free.prototype.map = function(f) {
    return this.isPure()
         ? Free.Pure(f(this.fromPure()))
         : Free.Free(this.fromFree().map(f));
  };

  // Applicative
  // -----------

  Free.of = Free.Pure;

  Free.prototype.ap = function(that) {
    return  this.isPure()
         ? (that.isPure()
         ?  Free.Pure(this.fromPure()(that.fromPure()))
         :  Free.Free(that.map(function(a) {
              return a.map(this.fromPure());
            })))
         :  Free.Free(this.fromFree().map(function(a) {
              return a.ap(that);
            }));
  };

  // Chain
  // -----

  Free.prototype.chain = function(f) {
    return this.isPure()
         ? f(this.fromPure())
         : Free.Free(this.fromFree().map(function(a) {
             return a.chain(f);
           }));
  };

/*  return Object.freeze(Free);

}*/

module.exports = Free;
