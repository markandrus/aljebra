<a href="https://github.com/pufuwozu/fantasy-land"><img src="https://raw.github.com/pufuwozu/fantasy-land/master/logo.png" align="right" width="82px" height="82px" alt="Fantasy Land logo" /></a>

About [<img src="https://travis-ci.org/markandrus/aljebra.png">](http://travis-ci.org/#!/markandrus/aljebra)
=====

_Note: this package is unstable!_

Aljebra provides toy implementations of the algebraic structures defined in the [Fantasy Land specification](https://github.com/pufuwozu/fantasy-land), mostly borrowed from [Haskell libraries](http://hackage.haskell.org/package/base).

Semigroup
=========

Constructors
------------

The following function returns a Semigroup constructor.

| Function                | Description                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| `new Dual(s)`           | Given Semigroup `s`, flip `s.concat` and return a constructor for the resulting Semigroup. |
| `new Semigroup(concat)` | Given binary function `concat`, return a Semigroup constructor.                            |

Most of the following instance constructors can be called like so:

~~~JavaScript
var Semigroup = require('lib/Semigroup.js').constructor.Semigroup;

var Min = new Semigroup(function(a, b) {
  return a < b ? a : b;
});

var a = new Min(1); // Value `1` wrapped in `Min`.
~~~

Instances
---------

_This module re-exports all Monoid instances._

| Constructor               | `concat`                   | Notes
| ------------------------- | -------------------------- | -----
| `new Either(left, right)` | "Takes the first `right`." | Must provide either `left` or `right`.
| `new First(a)`            | "Takes the first `a`."     |
| `new Last(a)`             | "Takes the last `a`."      |
| `new Max(a)`              | `>`                        |
| `new Min(a)`              | `<`                        |

Monoid
======

Constructors
------------

The following functions return Monoid constructors.

| Function                           | Description
| ---------------------------------- | -----------
| `new Dual(m)`                      | Given Monoid `m`, flip `m.concat` and return a constructor for the resulting Monoid.
| `new Monoid(zero, concat)`         | Given value `zero` and binary function `concat`, return a Monoid constructor.
| `new MonoidFromSemigroup(s, zero)` | Given Semigroup `s` and value `zero`, return a Monoid constructor.
| `new OptionalSemigroup(s)`         | Lift Semigroup `s` into `Optional` and return a constructor for the resulting Monoid.

Most of the following instance constructors can be called like so:

~~~JavaScript
var Monoid = require('lib/Monoid.js').constructors.Monoid;

var Any = new Monoid(false, function(a, b) {
  return a || b;
});

var a = new Any(false), // Value `false` wrapped in `Any`.
    b = new Any();      // Equivalent to `Any.zero()`.
~~~

Instances
---------

| Constructor      | `zero`            | `concat`             | Notes
| ---------------- | ----------------- | -------------------- | -----
| `new All(a)`     | `true`            | `&&`                 |
| `new Any(a)`     | `false`           | <code>││</code>      |
| `new Array(a)`   | `[]`              | `concat`             |
| `new Endo(a)`    | identity function | function composition | `a` must be a function from values of type `b` to `b`.
| `new Product(a)` | `1`               | `*`                  |
| `new Sum(a)`     | `0`               | `+`                  |

Functor
=======

Instances
---------

_This module re-exports all Monad instances._

| Constructor               | `map(f)`
| ------------------------- | --------
| `new Either(left, right)` | Apply `f` to `right`.

Applicative
===========

Instances
---------

_This module re-exports all Monad instances._

Monad
=====

Constructors
------------

~~~JavaScript
var Optional = require('lib/Monad.js').instances.Optional;

var a = Optional.of(1), // Value `1` wrapped in `Optional`.
    b = Optional.of();  // An empty `Optional`.
~~~

Instances
---------

| Constructor               | `of`               | `chain`
| ------------------------- | ------------------ | -------
| `new Id(a)`               | `Id.of(a)`         | 
| `new Either(left, right)` | `Either.of(right)` | "`left` short-circuits the chain."
| `new Optional(a)`         | `Optional.of(a)`   |

Testing
=======

About
-----

_Note: the test suite itself has not been tested!_

The test suite attempts to verify that the instances of algebraic structures defined in this library satisfy the laws defined in the [Fantasy Land specification](https://github.com/pufuwozu/fantasy-land).

Before running, make sure you have installed the package with `npm install`, as the test suite relies on [Mocha](http://visionmedia.github.io/mocha/).

~~~
$ make about-testing
Testing
  make test               # Run all instance tests
  make test-instances     # Run all instance tests
  make test-noninstances  # Run all noninstance tests
  make test-all           # Run all tests
  make test-all-verbose   # Run all tests in verbose mode
  make testing            # Run all tests continuosly
~~~

The test suite runs instance tests for the previously defined instances. Additionally, the test suite contains a number of "sanity checks" in the form of noninstance tests.
