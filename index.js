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
    var self = this,
        extended = {};
    for (var prop in self)
      extended[prop] = self[prop];
    Array.prototype.slice.call(arguments).map(function(from) {
      if (from) {
        for (var prop in from) {
          extended[prop] = from[prop];
        }
      }
    });
    return extended;
  }
});
