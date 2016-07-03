var connect = require('connect');
var harness = require('./harness');

var routes = connect.router(function(app) {
  harness.addRoutes(function(name, handler) {
    app.get('/' + name + '/:id', handler);
  });
});

connect.createServer(routes).listen(harness.port);
