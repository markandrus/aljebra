<a href="https://github.com/pufuwozu/fantasy-land"><img src="https://raw.github.com/pufuwozu/fantasy-land/master/logo.png" align="right" width="82px" height="82px" alt="Fantasy Land logo" /></a>

About [<img src="https://travis-ci.org/markandrus/aljebra.png">](http://travis-ci.org/#!/markandrus/aljebra)
=====

_Note: this package is unstable!_

Aljebra provides toy implementations of the algebraic structures defined in the [Fantasy Land specification](https://github.com/pufuwozu/fantasy-land), mostly borrowed from [Haskell libraries](http://hackage.haskell.org/package/base).

Semigroup
=========

Constructor
-----------

* `Semigroup(concat)`

Instances
---------

| Name | `concat` |
| ---- | -------- |
| Max  | `>`      |
| Min  | `<`      |

_This module re-exports all Monoid instances._

Monoid
======

Constructors
------------

* `Monoid(zero, concat)`
* `MonoidFromSemigroup(semigroup, zero)`
* `OptionalMonoidFromSemigroup(semigroup)`

Instances
---------

| Name    | `zero`            | `concat`             |
| ------- | ----------------- | -------------------- |
| All     | `true`            | `&&`                 |
| Any     | `false`           | <code>││</code>      |
| Array   | `[]`              | `concat`             |
| Endo    | identity function | function composition |
| Product | `1`               | `*`                  |
| Sum     | `0`               | `+`                  |

Monad
=====

Instances
---------

| Name     |
| -------- |
| Id       |
| Optional |

Testing
=======

About
-----

_Note: the test suite itself has not been tested!_

The test suite attempts to verify that the instances of algebraic structures defined in this library satisfy the laws defined in the [Fantasy Land specification](https://github.com/pufuwozu/fantasy-land).

Before running, make sure you have installed the package (`npm install`), as the test suite relies on [Mocha](http://visionmedia.github.io/mocha/).

Running
-------

To run the tests, issue `npm test` or `make test`. You should see something similar to the following:

~~~
✗ make test                                               
./node_modules/.bin/mocha -R spec test/*/instances/*.js


  Id:
    ✓ Associativity (Chain) 
    ✓ Left Identity (Monad) 
    ✓ Right Identity (Monad) 

  All:
    ✓ Associativity (Semigroup) 
    ✓ Left Identity (Monoid) 
    ✓ Right Identity (Monoid) 

  Any:
    ✓ Associativity (Semigroup) 
    ✓ Left Identity (Monoid) 
    ✓ Right Identity (Monoid) 

  Array:
    ✓ Associativity (Semigroup) (13017ms)
    ✓ Left Identity (Monoid) (3485ms)
    ✓ Right Identity (Monoid) (3393ms)

  Endo:
    ✓ Associativity (Semigroup) (447ms)
    ✓ Left Identity (Monoid) (113ms)
    ✓ Right Identity (Monoid) (115ms)

  Product:
    ✓ Associativity (Semigroup) 
    ✓ Left Identity (Monoid) 
    ✓ Right Identity (Monoid) 

  Sum:
    ✓ Associativity (Semigroup) 
    ✓ Left Identity (Monoid) 
    ✓ Right Identity (Monoid) 

  Max:
    ✓ Associativity (Semigroup) 

  Min:
    ✓ Associativity (Semigroup) 


  23 tests complete (21 seconds)

~~~
