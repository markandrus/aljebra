function extend(a, b) {
  var c = {};
  for (var prop in a)
    c[prop] = a[prop];
  for (var prop in b)
    c[prop] = b[prop];
  return c;
}

var constructors = require('./lib2/constructors.js'),
    Semigroup = require('./lib2/Semigroup.js'),
    Monoid = require('./lib2/Monoid.js'),
    Functor = require('./lib2/Functor.js'),
    Applicative = require('./lib2/Applicative.js'),
    Monad = require('./lib2/Monad.js');

Semigroup.instances = extend(Semigroup.instances, Monoid.instances);
Functor.instances = extend(Functor.instances, Applicative.instances);
Applicative.instances = extend(Applicative.instances, Monad.instances);

module.exports = {
  constructors: constructors,
  Semigroup: Semigroup,
  Monoid: Monoid,
  Functor: Functor,
  Applicative: Applicative,
  Monad: Monad
};
