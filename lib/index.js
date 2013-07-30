'use strict';

module.exports = { 
  Data: {
    Cont:      require('./Data/Cont.js'),
    Either:    require('./Data/Either.js'),
    Free:      require('./Data/Free.js'),
    Identity:  require('./Data/Identity.js'),
    List:      require('./Data/List.js'),
    Maybe:     require('./Data/Maybe.js'),
    Monoid:    require('./Data/Monoid.js'),
    Semigroup: require('./Data/Semigroup.js')
  },
  Trans: {
    ContT:     require('./Trans/ContT.js'),
    EitherT:   require('./Trans/EitherT.js'),
    IdentityT: require('./Trans/IdentityT.js'),
    ListT:     require('./Trans/ListT.js'),
    MaybeT:    require('./Trans/MaybeT.js'),
    MonoidT:   require('./Trans/MonoidT.js')
  }
};
