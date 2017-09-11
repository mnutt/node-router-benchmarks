const http = require('http');
const router = require('find-my-way')();
const harness = require('../harness');

harness.addRoutes(function(name, handler) {
  router.get('/' + name + '/:id', handler);
});

http.createServer(function(req, res) {
  router.lookup(req, res);
}).listen(harness.port);
