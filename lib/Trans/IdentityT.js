'use strict';

var util = require('../util.js'),
    addMethod = util.addMethod,
    addGetter = util.addGetter,
    id = util.id;

// IdentityT
// =========
//
// Instances:
//
//   * MonadTrans
//   * MonadCont (when base monad is an instance of MonadCont)
//   * MonadError (when base monad is an instance of MonadError)

function IdentityT(monad) {

  function IdentityT(m) {
    var self = this instanceof IdentityT ? this
             : Object.create(IdentityT.prototype);
    addGetter(self, 'runIdentityT', m);
    return Object.freeze(self);
  }

  // Functor
  // -------

  IdentityT.prototype.map = function(f) {
    return new IdentityT(this.runIdentityT().map(f));
  };

  // Applicative
  // -----------

  IdentityT.of = function(a) {
    return IdentityT(monad.of(a));
  };

  IdentityT.prototype.ap = function(a) {
    return new IdentityT(this.runIdentityT().ap(a.runIdentityT()));
  };

  // Chain
  // -----

  IdentityT.prototype.chain = function(k) {
    return IdentityT(this.runIdentityT().chain(k).runIdentityT());
  };

  return Object.freeze(IdentityT);
}

module.exports = IdentityT;
