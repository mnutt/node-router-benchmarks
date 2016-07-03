var router = require('http-hash')();
var http = require('http');
var harness = require('./harness');


harness.addRoutes(function(name, handler) {
  router.set('/' + name + '/:id', handler);
});

http.createServer(function(req, res) {
  var route = router.get(req.url);
  route.handler(req, res, route.params);
}).listen(harness.port);
