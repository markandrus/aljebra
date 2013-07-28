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

  MaybeT.prototype.map = function(f) {
    return new MaybeT(this.runMaybeT().map(function(a) { return a.map(f); }));
  };

  // Applicative
  // -----------

  MaybeT.of = function(a) {
    return new MaybeT(monad.of(Maybe.Just(a)));
  };

  function liftM(f, m) {
    return m.chain(function(x) {
      return MaybeT.of(f(x));
    });
  }

  function liftM2(f, m1, m2) {
    return m1.chain(function(x1) {
      return m2.chain(function(x2) {
        return MaybeT.of(f(x1, x2));
      });
    });
  }

  function ap(mf, ma) {
    return liftM2(function(a) {
      return a;
    }, mf, ma);
  }

  MaybeT.prototype.ap = function(a) {
    var self = this;
    return ap(self, a);
  };

  // Chain
  // -----

  MaybeT.prototype.chain = function(f) {
    return new MaybeT(
      this.runMaybeT().chain(function(v) {
        return v.isNothing() ? MaybeT.of(Maybe.Nothing())
                             : f(v.fromJust()).runMaybeT();
      })
    );
  };

  // MonadTrans
  // ----------

  function lift(m) {
    return new MaybeT(monad.of(Maybe.Just(m)));
  };

  return Object.freeze(MaybeT);
}

module.exports = MaybeT;
