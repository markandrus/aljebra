/*Object.defineProperty(Object.prototype, "extend", {
enumerable: false,
value: function(from) {
var props = Object.getOwnPropertyNames(from);
var dest = this;
props.forEach(function(name) {
if (name in dest) {
var destination = Object.getOwnPropertyDescriptor(from, name);
Object.defineProperty(dest, name, destination);
}
});
return this;
}
});*/
Object.defineProperty(Object.prototype, 'extend', {
  enumerable: false,
  value: function() {
    var self = this;
    Array.prototype.slice.call(arguments).map(function(from) {
      if (from) {
        for (var prop in from) {
          self[prop] = from[prop];
        }
      }
    });
    return self;
  }
});
