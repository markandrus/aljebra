'use strict';

var util = require('../util.js'),
    Either = require('../Data/Either.js'),
    addMethod = util.addMethod,
    addGetter = util.addGetter,
    id = util.id,
    join = util.join;

// EitherT
// =======
//
// Instances:
//
//   * MonadTrans
//   * MonadCont (when base monad is an instance of MonadCont)
//   * MonadError

function EitherT(monad) {

  function EitherT(m) {
    var self = this instanceof EitherT ? this
             : Object.create(EitherT.prototype);
    addGetter(self, 'runEitherT', m);
    return Object.freeze(self);
  }

  // Functor
  // -------

  EitherT.prototype.map = function(f) {
    return EitherT(this.runEitherT().map(f));
  };

  // Applicative
  // -----------

  EitherT.of = function(a) {
    return EitherT(monad.of(Either.Right(a)));
  };

  EitherT.prototype.ap = function(v) {
    return EitherT(this.runEitherT().chain(function(mf) {
      return mf.fromEither(
        function(l1) {
          return v.runEitherT().chain(function(mv) {
            return mv.fromEither(
              function(l2) {
                return monad.of(Either.Left(l1.concat(l2)));
              },
              function(r2) {
                return monad.of(Either.Left(l1));
              }
            );
          });
        },
        function(r1) {
          return v.runEitherT().chain(function(mv) {
            return mv.fromEither(
              function(l2) {
                return monad.of(Either.Left(l2));
              },
              function(r2) {
                return monad.of(Either.Right(r1(r2)));
              }
            );
          });
        }
      );
    }));
  };

  // Chain
  // -----

  EitherT.prototype.chain = function(k) {
    return EitherT(this.runEitherT().chain(function(a) {
      return a.fromEither(
        function(l) {
          return monad.of(Either.Left(l));
        }, function(r) {
          return k(r).runEitherT();
        }
      );
    }));
  };

  // MonadError
  // ----------

  EitherT.error = function(e) {
    return EitherT(monad.of(Either.Left(e)));
  };

  EitherT.left = EitherT.error;

  // MonadTrans
  // ----------

  EitherT.lift = function(m) {
    return EitherT(m.map(Either.Right));
  };

  // MonadCont
  // ---------

  EitherT.Cont = function(k) {
//    return EitherT.lift(monad(k));
    return join(EitherT.lift(monad(k)));
  };

/* callCC f = join $ lift $ ContT $ \c -> 
              runContT (return $ f (\a -> lift $ ContT $ \_ -> c (return a))) c */

  EitherT.callCC = function(f) {
    return join(EitherT.lift(monad(function(c) {
      function continuation(a) {
        return EitherT.lift(monad(function() {
          return c(EitherT.of(a));
        }));
      }
      return monad.of(f(continuation)).runContT(c);
    })));
  };

  return Object.freeze(EitherT);
}

module.exports = EitherT;
