'use strict';

module.exports = { 
  Data: {
    Cont:      require('./Data/Cont.js'),
    Either:    require('./Data/Either.js'),
    Identity:  require('./Data/Identity.js'),
    Maybe:     require('./Data/Maybe.js'),
  },
  Trans: {
    ContT:     require('./Trans/ContT.js'),
    EitherT:   require('./Trans/EitherT.js'),
    IdentityT: require('./Trans/IdentityT.js'),
    MaybeT:    require('./Trans/MaybeT.js')
  }
};
