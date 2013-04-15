<a href="https://github.com/pufuwozu/fantasy-land"><img src="https://raw.github.com/pufuwozu/fantasy-land/master/logo.png" align="right" alt="Fantasy Land logo" /></a>

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

Testing
=======

About
-----

_Note: the test suite itself has not been tested!_

The test suite attempts to verify that the instances of algebraic structures defined in this library satisfy the laws defined in the [Fantasy Land specification](https://github.com/pufuwozu/fantasy-land).

Before running, make sure you have installed the package (`npm install`), as the test suite relies on [Mocha](http://visionmedia.github.io/mocha/).

Running
-------

To run the tests, issue the following:

~~~
$ npm test
~~~

For more information about testing, issue the following:

~~~
$ make about-testing
~~~
