var http = require('http');
var harness = require('../harness');
var router = require('choreographer').router();

harness.addRoutes(function(name, handler) {
  router.get('/' + name + '/*', handler);
});

http.createServer(router).listen(harness.port);
