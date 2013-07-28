'use strict';

var util = require('../util.js'),
    addGetter = util.addGetter;

// http://lpaste.net/90890

// This is most likely completely inappropriate for JavaScript.

function ListF(a, l) {
  var self = this instanceof ListF ? this
           : Object.create(ListF.prototype);
  if (typeof a !== 'undefined' && typeof l !== 'undefined') {
    addGetter(self, 'isCons', true);
    addGetter(self, 'isNil', false);
    addGetter(self, 'a', a);
    addGetter(self, 'l', l);
  } else {
    addGetter(self, 'isCons', false);
    addGetter(self, 'isNil', true);
  }
  return Object.freeze(self);
}

ListF.Cons = ListF;

ListF.Nil = function() {
  return new ListF();
};

ListF.prototype.map = function(f) {
  return this.isNil() ? this :
    ListF.Cons(f(this.a()), this.l().map(f));
};

function ListT(monad) {

  function ListT(m) {
    var self = this instanceof ListT ? this
             : Object.create(ListT.prototype);
    addGetter(self, 'runListT', m);
    return Object.freeze(self);
  }

  ListT.prototype.map = function(f) {
    return new ListT(this.runListT().map(function(a) { return a.map(f); }));
  };

  ListT.of = function(a) {
    return new ListT(monad.of(ListF.Cons(a, ListT.mzero())));
  };

  function liftM(f, m) {
    return m.chain(function(x) {
      return ListT.of(f(x));
    });
  }

  function liftM2(f, m1, m2) {
    return m1.chain(function(x1) {
      return m2.chain(function(x2) {
        return ListT.of(f(x1, x2));
      });
    });
  }

  function ap(mf, ma) {
    return liftM2(function(a) {
      return a;
    }, mf, ma);
  }

  ListT.prototype.ap = function(a) {
    var self = this;
    return ap(self, a);
  };

  ListT.mzero = function() {
    return new ListT(monad.of(ListF.Nil()));
  };

  ListT.prototype.mplus = function(l2) {
    function go(l) {
      return new ListT(
        l.runListT().chain(function(x) {
          return x.isNil() ? l2.runListT() :
            monad.of(ListF.Cons(x.a(), go(x.l())));
        })
      );
    }
    return go(this);
  };

  ListT.prototype.chain = function(f) {
    return new ListT(
      this.runListT().chain(function(x) {
        return (x.isNil() ? ListT.mzero()
                          : f(x.a()).mplus(x.l().chain(f))
               ).runListT();
      })
    );
  };

  ListT.prototype.forEach = function(k) {
    var self = this;
    function go(l) {
      l.runListT().chain(function(x) {
        if (x.isNil())
          return;
        k(x.a());
        go(x.l());
      });
    }
    go(self);
  };

  return Object.freeze(ListT);

}

/*function ListT(monad) {

  function ListT(m) {
    var self = this instanceof ListT ? this
             : Object.create(ListT.prototype);
    addGetter(self, 'runListT', m);
    return Object.freeze(self);
  }

  // Functor
  // -------

  ListT.prototype.map = function(f) {
    return new ListT(this.runListT().map(function(a) { return a.map(f); }));
  };

  // Applicative
  // -----------

  ListT.of = function(a) {
    return ListT(monad.of(List.of(a)));
  };

  function liftM(f, m) {
    return m.chain(function(x) {
      return ListT.of(f(x));
    });
  }

  function liftM2(f, m1, m2) {
    return m1.chain(function(x1) {
      return m2.chain(function(x2) {
        return ListT.of(f(x1, x2));
      });
    });
  }

  function ap(mf, ma) {
    return liftM2(function(a) {
      return a;
    }, mf, ma);
  }

  ListT.prototype.ap = function(a) {
    var self = this;
    return ap(self, a);
  };

  // Chain
  // -----

  function mzero() {
    return new ListT(monad.of(List.empty()));
  }

  // Oh god, I have no idea if I transcribed this correctly. : O
  function mplus(l1, l2) {
    function go(l) {
      return new ListT(
        l.runListT().chain(function(lxs) {
          var xs = lxs.unList();
          return xs.length === 0 ? l2.runListT() :
            monad.of(new List(xs.slice(0, 1).concat(
              go(new ListT(monad.of(new List(xs.slice(1)))))
              go(new ListT(monad.of(new List(xs.slice(1)))))

            )));
        })
      );
    }
    return go(l1);
  }

  ListT.prototype.chain = function(f) {
    return new ListT(
      this.runListT().chain(function(lxs) {
        var xs = lxs.unList();
        return xs.length === 0 ? mzero() :
          mplus(f(xs[0]), (new ListT(monad.of(new List(xs.slice(1))))).chain(f));
      })
    );
  };

  return Object.freeze(ListT);
}*/

module.exports = ListT;
