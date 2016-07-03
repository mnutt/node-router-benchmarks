var Router = require('barista').Router;
var http = require('http');
var harness = require('../harness');

var router = new Router();

var handlers = {};

harness.addRoutes(function(name, handler) {
  handlers[name] = handler;
  router.get('/' + name + '/:id').to('handlers.'+name);
});

http.createServer(function(req, res) {
  var params = router.first(req.url, req.method);
  handlers[params.action](req, res, params);
}).listen(harness.port);
