var util = require('../util.js'),
    addGetter = util.addGetter,
    Maybe = require('../Data/Maybe.js');

function Dual(m) {
  var self = this instanceof Dual ? this
           : Object.create(Dual.prototype);
  addGetter(self, 'getDual', m);
  return Object.freeze(self);
};

Dual.empty = function() {
  return new Dual(m.empty());
};

Dual.prototype.concat = function(b) {
  return new Dual(b.getDual().concat(this.getDual()));
};

function MaybeSemigroup(s) {
  var self = this instanceof MaybeSemigroup ? this
           : Object.create(MaybeSemigroup.prototype);
  addGetter(self, 'getMaybeSemigroup', Maybe(s));
  return Object.freeze(s);
}

MaybeSemigroup.empty = function() {
  return new MaybeSemigroup(Maybe.Nothing());
};

MaybeSemigroup.prototype.concat = function(that) {
  function concat(a) {
    return function(b) {
      return a.concat(b);
    };
  }
  return Maybe.Just(concat)
    .ap(this.getMaybeSemigroup())
    .ap(that.getMaybeSemigroup())
    .fromMaybe(
      MaybeSemigroup.empty,
      MaybeSemigroup
    );
};

module.exports = {
  Dual: Dual,
  MaybeSemigroup: MaybeSemigroup
};
