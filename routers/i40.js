var Router = require('i40');
var http = require('http');
var harness = require('../harness');

var router = Router();

harness.addRoutes(function(name, handler) {
  router.addRoute('/' + name + '/:id', handler);
});

http.createServer(function(req, res) {
  var route = router.match(req.url);
  route.fn.apply(null, [req, res, route.params]);
}).listen(harness.port);
