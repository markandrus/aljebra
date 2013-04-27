'use strict';

var laws = require('../laws.js'),
    run = require('../../common/test.js').instance.run,
    Cont = require('../../../index.js').constructors.Cont;

function a_to_b_1 (a) {
  return Number(a).toString();
}

function a_to_b_2 (a) {
  return "test";
}

function b_to_c_1 (b) {
  return typeof b === 'string';
}

function b_to_c_2 (b) {
  return false;
}

run(laws, {
  name: 'Cont',
  domains: {
    'm a': [Cont.of(1), Cont.of(2)],
    'a': [1, 2],
    'a -> m a': [
      function(a) {
        return Cont.of(10-a);
      },
      function(a) {
        return Cont.of(5-a);
      },
    ],
    'a -> b': [a_to_b_1, a_to_b_2],
    'b -> c': [b_to_c_1, b_to_c_2],
    'm (a -> b)': [Cont.of(a_to_b_1), Cont.of(a_to_b_2)],
    'm (b -> c)': [Cont.of(b_to_c_1), Cont.of(b_to_c_2)]
  },
  async: true,
  check: require('../../common/equality.js').cont
});
