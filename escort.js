var connect = require('connect');
var escort = require('escort');
var harness = require('./harness');

var router = escort(function(routes) {
  harness.addRoutes(function(name, handler) {
    routes.get(name, "/" + name + "/{id}", handler);
  });
});

connect(router).listen(harness.port);
