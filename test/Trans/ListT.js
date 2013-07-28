'use strict';

var Identity = require('../../lib/index.js').Data.Identity,
    ListT = require('../../lib/index.js').Trans.ListT(Identity),
    test = require('../test.js');

test({
  name: 'ListT Identity',
  laws: ['Functor', 'Applicative', 'Chain', 'Monad'],
  constructors: [ListT.of],
  dictionary: ListT,
  equals: function(ma, mb) {
    var a = [], b = [];
    ma.forEach(a.push);
    mb.forEach(b.push);
    if (a.length !== b.length)
      return false;
    for (var i=0; i<a.length; i++)
      if (a[i] !== b[i])
        return false;
    return true;
  }
});
