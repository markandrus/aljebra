'use strict';

var req = require('./common.js').req;

function Id(a) {
  req.exactly(1, arguments);
  this.value = a;
  return Object.freeze(this);
}

function Optional(a) {
  req.atmost(1, arguments);
  if (arguments.length === 1)
    this.value = a;
  return Object.freeze(this);
}

function Default(def) {
  req.exactly(1, arguments);
  function DefaultInstance(a) {
    req.atmost(1, arguments);
    if (arguments.length === 1)
      this.value = a;
    else
      this.value = def;
    return Object.freeze(this);
  }
  return DefaultInstance;
}

function Either(which, a) {
  req.exactly(2, arguments)
     .type('string', which);
  if (['left', 'right'].indexOf(which) === -1)
    throw new Error('Expects either "left" or "right".');
  this[which] = a;
  return Object.freeze(this);
}

module.exports = {
  Id: Id,
  Optional: Optional,
  Default: Default,
  Either: Either
};
