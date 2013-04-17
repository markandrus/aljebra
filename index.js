var extend = require('./lib/common.js').extend,
    constructors = require('./lib/constructors.js'),
    Semigroup = require('./lib/Semigroup.js'),
    Monoid = require('./lib/Monoid.js'),
    Functor = require('./lib/Functor.js'),
    Applicative = require('./lib/Applicative.js'),
    Monad = require('./lib/Monad.js');

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
