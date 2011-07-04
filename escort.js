var connect = require('connect');
var escort = require('escort');

var controller = {
  get: function(req, res, params) {
    res.writeHead(200, {});
    res.end("Got product id " + params.id);
  }
};

var names = ["products", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "twenty"]

connect(
  escort(function(routes) {
    for(var i = 0; i < names.length; i++) {
      routes.get(names[i], "/" + names[i] + "/{id}", controller.get);
    }
  })
).listen(2048);
