'use strict';

function addMethod(obj, key, value) {
  Object.defineProperty(obj, key, {
    // enumerable: false,
    enumerable: true,
    configurable: false,
    writable: false,
    value: value
  });
}

function addGetter(obj, key, value) {
  addMethod(obj, key, function() {
    return value;
  });
}

function id(a) {
  return a;
}

function join(m) {
  return m.chain(function(a) { return a; });
}

module.exports = {
  addMethod: addMethod,
  addGetter: addGetter,
  id: id,
  join: join
};
