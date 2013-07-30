'use strict';

var util = require('../util.js'),
    addMethod = util.addMethod,
    addGetter = util.addGetter,
    id = util.id;

// Either
// ======
//
// Instances:
//
//   * Functor
//   * Applicative
//   * Chain
//   * Monad

function Either(which, a) {
  var self = this instanceof Either ? this
           : Object.create(Either.prototype);
  switch (which) {
    case 'Left':
      addGetter(self, 'isLeft', true);
      addGetter(self, 'isRight', false);
      addGetter(self, 'fromLeft', a);
      addMethod(self, 'fromEither', function(l, r) {
        return l(a);
      });
      break;
    case 'Right':
      addGetter(self, 'isLeft', false);
      addGetter(self, 'isRight', true);
      addGetter(self, 'fromRight', a);
      addMethod(self, 'fromEither', function(l, r) {
        return r(a);
      });
      break;
    default:
      throw new TypeError('Expected "Left" or "Right".');
  }
  return Object.freeze(self);
}

Either.Left = function(a) {
  return Either('Left', a);
};

Either.Right = function(a) {
  return Either('Right', a);
};

// Functor
// -------

Either.prototype.map = function(f) {
  return this.fromEither(
    Either.Left,
    function(a) {
      return Either.Right(f(a));
    }
  );
};

// Applicative
// -----------

Either.of = Either.Right;

Either.prototype.ap = function(e) {
  return this.fromEither(
    function(l1) {
      return e.fromEither(
        function(l2) {
          return Either.Left(l1.concat(l2));
        }, function() {
          return Either.Left(l1);
        }
      );
    }, function(r1) {
      return e.fromEither(
        function(l2) {
          return Either.Left(l2);
        }, function(r2) {
          return Either.Right(r1(r2));
        }
      );
    }
  );
};

// Chain
// -----

Either.prototype.chain = function(f) {
  return this.fromEither(Either.Left, f);
};

function equal(c, d) {
  return c.isLeft()  && d.isLeft()  && c.fromLeft()  === d.fromLeft()
      || c.isRight() && d.isRight() && c.fromRight() === d.fromRight();
}

module.exports = Either;
