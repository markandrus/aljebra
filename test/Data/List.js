'use strict';

var List = require('../../lib/index.js').Data.List,
    test = require('../test.js');

test({
  name: 'List',
  laws: ['Monoid', 'Functor', 'Applicative', 'Chain', 'Monad'],
  constructors: [List.of],
  dictionary: List,
  equals: function(ma, mb) {
    var a = ma.unList(),
        b = mb.unList();
    if (a.length !== b.length)
      return false;
    for (var i=0; i<a.length; i++)
      if (a[i] !== b[i])
        return false;
    return true;
  }
});
