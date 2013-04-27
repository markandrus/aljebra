var Either = require('./constructors.js').Either;

function isLeft(e) {
  return e instanceof Either && 'left' in e;
}

function isRight(e) {
  return e instanceof Either && 'right' in e;
}

module.exports = {
  isLeft: isLeft,
  isRight: isRight
};
