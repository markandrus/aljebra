var laws = require('../laws.js'),
    run = require('../../common/test.js').instance.run,
    Product = require('../../../index.js').Monoid.instances.Product;

run(laws, {
  name: 'Product',
  domains: {'m a': [new Product(0), new Product(1), new Product(2)]},
  check: require('../../common/equality.js').simple
});
