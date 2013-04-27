<a href="https://github.com/pufuwozu/fantasy-land"><img src="https://raw.github.com/pufuwozu/fantasy-land/master/logo.png" align="right" width="82px" height="82px" alt="Fantasy Land logo" /></a>

About [<img src="https://travis-ci.org/markandrus/aljebra.png">](http://travis-ci.org/#!/markandrus/aljebra)
=====

Aljebra provides toy implementations of the algebraic structures defined in the [Fantasy Land specification](https://github.com/pufuwozu/fantasy-land), mostly borrowed from [Haskell libraries](http://hackage.haskell.org/package/base).

Algebraic Structures
====================

The following objects each implement a constructor allowing you to lift values into these base objects. Many of the other instances in this library are built on top of these base objects. As such, they implement a similar constructor pattern.

| Constructor                                         | Description
| --------------------------------------------------- | -----------
| `new Id(a)`                                         | A value (Identity)
| `new Optional()` or `new Optional(a)`               | An optional value
| `new (new Default(a))` or `new (new Default(a))()`  | An optional with a default value
| `new Either('left', a)`, `Left(a)`, `new Either('right', b)`, or `Right(b)` | One of two types of values
| `new Cont(f)`                                       | A continuation or callback (`f` must return a new `Cont`)

Note that `new Default(a)` actually returns a constructor for an `Optional` that defaults to `a`. In the following sections, such constructors-for-constructors will be listed under the heading &#8220;Constructors&#8221; and all other simple constructors will be listed under &#8220;Instances&#8221;.

Semigroup
---------

### Constructors

| Constructor             | Description
| ----------------------- | -----------
| `new Semigroup(concat)` | Given associative binary function `concat`, return a Semigroup constructor.
| `new Dual(s)`           | Given Semigroup `s`, flip `s.concat` and return a constructor for the resulting Semigroup.

### Instances

| Constructor                                         | `concat`
| --------------------------------------------------- | --------
| `new Either('left', a)` or `new Either('right', b)` | Takes the first value labelled `'right'`.
| `new First(a)`                                      | Takes the first `a`.
| `new Last(a)`                                       | Takes the last `a`.
| `new Max(a)`                                        | `>`
| `new Min(a)`                                        | `<`

This module re-exports all Monoid instances.

Monoid
------

### Constructors

| Constructor                        | Description
| ---------------------------------- | -----------
| `new Monoid(zero, concat)`         | Given value `zero` and binary function `concat`, return a Monoid constructor.
| `new Dual(m)`                      | Given Monoid `m`, flip `m.concat` and return a constructor for the resulting Monoid.
| `new OptionalSemigroup(s)`         | Lift Semigroup `s` into `Optional` and return a constructor for the resulting Monoid.

### Instances

| Constructor      | `zero`            | `concat`             | Notes
| ---------------- | ----------------- | -------------------- | -----
| `new All(a)`     | `true`            | `&&`                 |
| `new Any(a)`     | `false`           | <code>││</code>      |
| `new Array(a)`   | `[]`              | `concat`             |
| `new Endo(a)`    | identity function | function composition | `a` must be a function from values of type `b` to `b`.
| `new Product(a)` | `1`               | `*`                  |
| `new Sum(a)`     | `0`               | `+`                  |

Functor
-------

### Instances

| Instance                                            | `map(f)`
| --------------------------------------------------- | --------
| `new Id(a)`                                         | Apply `f` to the value.
| `new Optional(a)` or `new Optional()`               | If the value exists, apply `f` to it.
| `new Either('left', a)`, `Left(a)`, `new Either('right', b)`, or `Right(b)` | If the value is labelled `'right'`, apply `f` to it.
| `new Cont(f)`                                       |

This module re-exports all Applicative instances.

Applicative
-----------

### Instances

This module re-exports all Monad instances.

Monad
-----

### Instances

| Constructor                                         | `of`                     | `chain`
| --------------------------------------------------- | ------------------------ | -------
| `new Id(a)`                                         | `new Id(a)`              |
| `new Optional(a)`                                   | `new Optional(a)`        | A missing value short-circuits the chain.
| `new Either('left', a)`, `Left(a)`, `new Either('right', b)`, or `Right(b)` | `new Either('right', a)` | A `'left'` vale short-circuits the chain.
| `new Cont(f)`                                       |                          |

Safety
======

* All of the algebraic operations defined above are pure.
* Each constructor `freeze`s its resulting object.
* Source code includes `'use strict'`, so attempting to mutate any of the structures throws a type error.
* Most argument calls are annotated with helpers from `./lib/common.js`. These throw errors, for example, when arguments are of the wrong type or wrong number are provided.

Testing
=======

_Note: the test suite itself could be better tested!_

The test suite attempts to verify that the instances of algebraic structures defined in this library satisfy the laws defined in the [Fantasy Land specification](https://github.com/pufuwozu/fantasy-land). Additionally, it includes a number of noninstance "sanity checks".

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

Instance Tests
--------------

### Example

~~~
  Id:
    ✓ Identity (Functor) 
    ✓ Composition (Functor) 
    ✓ Identity (Applicative) 
    ✓ Composition (Applicative) 
    ✓ Homomorphism (Applicative) 
    ✓ Interchange (Applicative) 
    ✓ Associativity (Chain) 
    ✓ Left Identity (Monad) 
    ✓ Right Identity (Monad) 

~~~

Noninstance Tests
-----------------

### Example

~~~
  Difference:
    ✓ is not a Semigroup 

  Rock, Paper, Scissors:
    ✓ is not a Semigroup 

~~~
