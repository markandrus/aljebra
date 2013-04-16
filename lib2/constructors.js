var req = require('./common.js');

function Id(a) {
  req.exactly(1, arguments);
  this.value = a;
  return this;
}

function Optional(a) {
  req.atmost(1, arguments);
  if (arguments.length === 1)
    this.value = a;
  return this;
}

function Default(def) {
  req.exactly(1, arguments);
  function DefaultInstance(a) {
    req.atmost(1, arguments);
    if (arguments.length === 1)
      return new Id(a);
    else
      return new Id(def);
  }
  return DefaultInstance;
}

function Either(which, a) {
  req.exactly(2, arguments);
  if (['left', 'right'].indexOf(which) === -1)
    throw new Error('Expects either "left" or "right".');
  this[which] = a;
  return this;
}

module.exports = {
  Id: Id,
  Optional: Optional,
  Default: Default,
  Either: Either
};
