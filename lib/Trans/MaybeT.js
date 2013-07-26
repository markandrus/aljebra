'use strict';

var Maybe = require('../Data/Maybe.js'),
    util = require('../util.js'),
    addMethod = util.addMethod,
    addGetter = util.addGetter,
    id = util.id;

// MaybeT
// ======
//
//   * MonadTrans
//   * MonadCont (when base monad is an instance of MonadCont)
//   * MonadError (when base monad is an instance of MonadError)

function MaybeT(monad) {

  function MaybeT(m) {
    var self = this instanceof MaybeT ? this
             : Object.create(MaybeT.prototype);
    addGetter(self, 'runMaybeT', m);
    return Object.freeze(self);
  }

  // Functor
  // -------

  MaybeT.map = undefined;

  // Applicative
  // -----------

  MaybeT.of = function(a) {
    return MaybeT.lift(monad.of(a));
  };

  MaybeT.ap = undefined;

  // Chain
  // -----

  MaybeT.prototype.chain = function(f) {
    return MaybeT(
      this.runMaybeT().chain(function(v) {
        return v.isNothing() ? Maybe.Nothing()
                             : f(v.fromJust()).runMaybeT();
      })
    );
  };

  // MonadTrans
  // ----------

  MaybeT.lift = function(m) {
    return MaybeT(m.map(Maybe.Just));
  };

  return Object.freeze(MaybeT);
}

module.exports = MaybeT;
