var http = require('http');
var router = require('light-router');
var harness = require('./harness');

harness.addRoutes(function(name, handler) {
  router.get('/' + name + '/:id', handler);
});

http.createServer(router).listen(harness.port);
